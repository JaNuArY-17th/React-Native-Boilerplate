// /**
//  * Redux Store Configuration
//  * Centralized state management setup with redux-toolkit
//  */

// import { configureStore } from '@reduxjs/toolkit';
// import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import counterReducer from './slices/counterSlice';
// import { middleware } from './middleware';

// /**
//  * Configure Redux store with redux-toolkit
//  * Add your reducers here as you create feature slices
//  */
// export const store = configureStore({
//   reducer: {
//     // Example: counter reducer - remove this as you add real features
//     counter: counterReducer,
    
//     // Add your feature reducers here:
//     // auth: authReducer,
//     // user: userReducer,
//     // etc.
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
//       },
//     }).concat(middleware),
//   devTools: __DEV__ ? {
//     name: 'Mobile App',
//     trace: true,
//     traceLimit: 25,
//   } : false,
// });

// // Redux Persist
// export const persistor = persistStore(store);

// // Type Definitions
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // Typed Hooks
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppDispatch = () => useDispatch<AppDispatch>();

// // Utilities
// export { resetStore, logStoreState, validateStoreState } from './utils';
