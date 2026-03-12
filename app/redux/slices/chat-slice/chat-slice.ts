import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
    name: 'chatSlice',
    initialState: {
        chats : []
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload
        },
        clearChats: (state) => {
            state.chats = []
        }
    }
});

export const {setChats, clearChats} = ChatSlice.actions;
export default ChatSlice.reducer;