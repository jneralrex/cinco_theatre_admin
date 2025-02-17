import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers } from "redux";
import adminReducer from "../slices/adminSlice";
import theatreAdminsReducer from "../slices/TheatreAdminSlice";
import screenReducer from "../slices/ScreenSlice";
import eventsReducer from "../slices/eventSlice";


// Logger middleware
const logger = createLogger({
  collapsed: true,
  diff: true,
});

// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theatre", "users"], // Reducers you want to persist
};

// Combine reducers
const rootReducer = combineReducers({
  theatre: adminReducer,
  theatreAdmins: theatreAdminsReducer,
  screens:screenReducer,
  events:eventsReducer,

});
// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }).concat(logger), // Add logger middleware
});

export const persistor = persistStore(Store);
export default Store;
