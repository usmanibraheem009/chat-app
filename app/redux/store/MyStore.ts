import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from "../slices/authSlice/authSlice";
import chatsReducer from "../slices/chat-slice/chat-slice";
import imageReducer from "../slices/imageSlice/imageSlice";
import messagesReducer from "../slices/messageSlice/messageSlice";
import themeReducer from "../slices/themeSlice/themeSlice";
import usersListReducer from "../slices/usersData/usersList";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['themeMode', 'authReducer',]
};

const rootReducer = combineReducers({
    authReducer: authReducer,
    imagePicker: imageReducer,
    usersList: usersListReducer,
    messagesList: messagesReducer,
    themeMode: themeReducer,
    chatReducer: chatsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const MyStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat()
})

export const persistor = persistStore(MyStore);

export default MyStore;