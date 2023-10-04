import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';



// Define a SIGNUP route handler
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body; // Get user data from the request body

    // Hash the user's password using bcrypt (with a salt of 10 rounds)
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new User instance with the hashed password
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        // Save the new user to the database
        await newUser.save();

        // Respond with a success message and 201 status code (Created)
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
};

// Define a SIGNIN route handler
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Check if a user with the provided email exists in the database
        const validUser = await User.findOne({ email });
        if (!validUser)
            return next(errorHandler(404, 'Invalid Credentials'));

        // Compare the provided password with the stored hashed password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword)
            return next(errorHandler(401, "Invalid Credentials"))

        // Generate a JSON Web Token (JWT) for authentication
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        // Remove the password field from the user data
        const { password: hashedPassword, ...rest } = validUser._doc;

        // Set the 'access_token' cookie with the JWT, and make it HTTP-only Also, set the cookie to expire in 7 days
        res.cookie('access_token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .status(200)
            .json(rest);

    } catch (error) {
        next(error)
    }
}

// Define a GOOGLE route handler
export const google = async (req, res, next) => {
    try {

        // Check if a user with the provided email already exists in the database
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            // User already exists, generate a JWT for authentication
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

            // Remove the password field from the user data
            const { password: hashedPassword, ...rest } = existingUser._doc;

            // Set the 'access_token' cookie with the JWT and make it HTTP-only
            res.cookie('access_token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }) //set the cookie to expire in 7 days
                .status(200)
                .json(rest);
        } else {
            // User doesn't exist, generate a random password and create a new user
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo
            });

            // Save the new user to the database
            await newUser.save();

            // Generate a JWT for authentication
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

            // Remove the password field from the user data
            const { password: hashedPassword2, ...rest } = newUser._doc;

            // Set the 'access_token' cookie with the JWT and make it HTTP-only
            res.cookie('access_token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }) //set the cookie to expire in 7 days
                .status(200)
                .json(rest);
        }
    } catch (error) {
        // Handle any errors that occur during the authentication process
        next(error);
    }
};

export const signout =(req, res) =>{
    res.clearCookie('access_token').status(200).json({message:'Signout Success!'});
};