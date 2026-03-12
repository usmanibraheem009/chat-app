// chatSelectors.ts
import { createSelector } from "@reduxjs/toolkit";

export const selectChatUsers = createSelector(
  (state: any) => state.chatReducer.chats,
  (state: any) => state.usersList.users,
  (state: any) => state.authReducer.user,
  (chats, usersList, currentUser) => {
    if (!currentUser) return [];
    return chats
      .map((chat: any) => {
        const otherUserId = chat.participants.find((id: string) => id !== currentUser.uid);
        const otherUser = usersList.find((u: any) => u.uid === otherUserId);
        if (!otherUser) return null;
        return {
          ...otherUser,
          lastMessage: chat.lastMessage,
          lastMessageTime: chat.lastMessageTime,
        };
      })
      .filter(Boolean);
  }
);