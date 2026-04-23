import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import AuthReducer from "../slices/authSlice/authSlice";
import ChatsReducer from "../slices/chat-slice/chat-slice";
import ImageReducer from "../slices/imageSlice/imageSlice";
import MessagesReducer from "../slices/messageSlice/messageSlice";
import ThemeReducer from "../slices/themeSlice/themeSlice";
import UsersListReducer from "../slices/usersData/usersList";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['themeMode', 'authReducer',]
};

const rootReducer = combineReducers({
    authReducer: AuthReducer,
    imagePicker: ImageReducer,
    usersList: UsersListReducer,
    messagesList: MessagesReducer,
    themeMode: ThemeReducer,
    chatReducer: ChatsReducer
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