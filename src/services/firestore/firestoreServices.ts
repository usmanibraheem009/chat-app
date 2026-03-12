import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export interface userProfileProps {
    userId: string,
    userName: string,
    email: string,
    profileImageUrl: string
};



export const getUserById = async (currentUser: string) => {
    try {
        const currentUserInfo = currentUser;
        const userRef = doc(db, 'users', currentUserInfo);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
            return {
                id: snapshot.id,
                ...snapshot.data()
            }
        }
    } catch (error) {
        console.log('Error getting user data: ', error);
        throw error;
    }
};

export const getAllUsers = async (currentUserId: string) => {
    try {
        if(!currentUserId) return [];
        const userRef = collection(db, 'users');
        const snapshot = await getDocs(userRef);
        const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })).filter((user) => user.id !== currentUserId);
        return users;
    } catch (error) {
        console.log('Error getting users: ', error);
    }
};

export const getMessages = (chatId: string, callBack: any) => {
    try {
        const messagesRef = collection(db, 'chats', chatId, 'messages');
        const q = query(messagesRef, orderBy("createdAt", "asc"));

        return onSnapshot(q, (snapshot: any) => {
            const msgs = snapshot.docs.map((doc: any) => {
                const data = doc.data();
                return {
                id: doc.id,
                ...doc.data(),
                createdAt: data.createdAt
                ? data.createdAt.toMillis()
                : null
            }
            });
            callBack(msgs);

        });
    } catch (error) {
        console.log('Error fetching messages: ', error);
    }
};

export const sendMessage = async (chatId: string, text: string, receiverId: string) => {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const messageData = {
            text,
            senderId: currentUser.uid,
            receiverId,
            createdAt: serverTimestamp(),
            type: 'text'
        };

        const messageRef = collection(db, 'chats', chatId, 'messages');
        await addDoc(messageRef, messageData);

        const chatRef = doc(db, 'chats', chatId);

        
        await setDoc(chatRef, {
            participants: [currentUser.uid, receiverId],
            lastMessage: text,
            lastMessageTime: serverTimestamp(),
            updatedAt: serverTimestamp()
        },
            { merge: true },
        );
    } catch (error) {
        console.log('Error sending message: ', error);
    }
};


import { where } from "firebase/firestore";

export const getUserChats = (currentUid: string, callback: any) => {
  const chatsRef = collection(db, "chats");

  const q = query(
    chatsRef,
    where("participants", "array-contains", currentUid),
    orderBy("lastMessageTime", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    callback(chats);
    console.log('user chats: ', chats);
  });
};