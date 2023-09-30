import User from "../models/user.model.js"; 
import bcryptjs from 'bcryptjs';

// Define a signup route handler
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
