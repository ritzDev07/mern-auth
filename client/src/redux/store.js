import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

// Create the Redux store using configureStore
export const store = configureStore({
    reducer: { user: userReducer }, // The root reducer that combines all the slices will be added here
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check for non-serializable actions
    }),
});
