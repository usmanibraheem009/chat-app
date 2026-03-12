import { createSlice } from "@reduxjs/toolkit";


interface Message {
    id: string;
    text: string;
    senderId: string;
    createdAt: number;
};


export const messageSlice = createSlice({
    name: 'messagesList',
    initialState: {
        messages: [] as Message[],
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    }
});

export const {setMessages} = messageSlice.actions;
export default messageSlice.reducer;