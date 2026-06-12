// import {configureStore} from '@reduxjs/toolkit';
// import userSlice from './userSlice';
// const store = configureStore({
//     reducer:{
//      user:userSlice
//     }
// })
// export default store;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import userSlice from './userSlice'; // Example slice

// 1. Combine all your reducers
const rootReducer = combineReducers({
  user: userSlice,
});

// 2. Set up the persistence configuration
const persistConfig = {
  key: 'InstantWeb',
  storage:storage.default, // Use localStorage
  whitelist: ['user'], // Optional: Only persist the user slice
};

// 3. Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore internal Redux Persist actions to avoid console errors
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Create the persistor instance
export const persistor = persistStore(store);
