import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine the userReducer into the rootReducer
const rootReducer = combineReducers({ user: userReducer });

// Configure the persistConfig for Redux Persist
const persistConfig = {
    key: 'root',      // Key to use for storing data in storage (we name it 'root', but you can choose any meaningful name)
    version: 1,       // Version of the persisted data
    storage,          // Use the storage imported from redux-persist
}

// Create a persistedReducer by wrapping rootReducer with Redux Persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store using configureStore
export const store = configureStore({
    reducer: persistedReducer, // Add the persistedReducer as the root reducer
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check for non-serializable actions
    }),
});

// Create a persistor to persist the store data
export const persistor = persistStore(store);