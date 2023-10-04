import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user slice of the Redux store
const initialState = {
    currentUser: null, // Initialize currentUser as null
    loading: false,    // Initialize loading as false
    error: false,      // Initialize error as false
};

// Create a userSlice using createSlice
const userSlice = createSlice({
    name: 'user',      // Specify the slice name
    initialState,      // Set the initial state defined above
    reducers: {
        // Define a reducer for when the sign-in process starts
        signInStart: (state) => {
            state.loading = true; // Set loading to true
        },
        // Define a reducer for when sign-in is successful
        signInSuccess: (state, action) => {
            state.currentUser = action.payload; // Update currentUser with the payload
            state.loading = false;             // Set loading to false
            state.error = false;               // Reset error to false
        },
        // Define a reducer for when sign-in fails
        signInFailure: (state, action) => {
            state.loading = false;       // Set loading to false
            state.error = action.payload; // Update error with the payload
        },
        //Define UPDATE
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //Define DELETE 
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});


export const {
    signInStart, signInSuccess, signInFailure,
    updateUserStart, updateUserSuccess, updateUserFailure,
    deleteUserStart, deleteUserSuccess, deleteUserFailure } = userSlice.actions;

export default userSlice.reducer;
