// Define an error handler utility function
export const errorHandler = (statusCode, message) => {
    // Create a new Error instance
    const error = new Error();

    // Set the status code and error message for the error object
    error.statusCode = statusCode;
    error.message = message;

    // Return the error object
    return error;
};
