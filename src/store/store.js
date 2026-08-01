import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { customerJourneyDetailsReducer } from "../CustomerJourneyDetails/CustomerJourneyDetails";
import { combineReducers } from "redux";

// 1. Create a persist config
const persistConfig = {
  key: "root",
  storage,
  // optional: whitelist or blacklist reducers
  // whitelist: ["customerJourneyDetails"]
};

// 2. Combine reducers (can scale for more)
const rootReducer = combineReducers({
  customerJourneyDetails: customerJourneyDetailsReducer,
});

// 3. Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure the store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// 5. Export both store and persistor
export const persistor = persistStore(store);
export default store;
