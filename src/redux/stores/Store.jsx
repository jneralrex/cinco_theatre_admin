import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import adminReducer from "../slices/adminSlice"
import usersReducer from "../slices/usersSlice"
const logger = createLogger({
  collapsed: true,
  diff: true,
  transformer: (state) => {
    return JSON.parse(JSON.stringify(state));
  },
});

const Store = configureStore({
  reducer: {
    admin: adminReducer,
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default Store;
