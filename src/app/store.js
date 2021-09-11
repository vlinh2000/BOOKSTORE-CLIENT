import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { persistStore, persistReducer, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import modalReducer from 'app/modalSlice';
import userReducer from 'app/userSlice';



const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['currentUser']
}

const rootReducers = combineReducers({
    modals: modalReducer,
    user: persistReducer(authPersistConfig, userReducer)
});

//config persist without modals , if you wanna choose 1 slice then use whitelist

const store = configureStore({
    reducer: rootReducers,
    //handle when server respone with status faild but in respone have data that you want
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});

export const persistor = persistStore(store);

export default store;