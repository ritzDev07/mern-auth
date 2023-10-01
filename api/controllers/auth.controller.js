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