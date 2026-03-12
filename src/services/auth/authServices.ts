import { router } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { getUserById } from '../firestore/firestoreServices';

export interface userProps {
    email: string;
    password: string;
    userName?: string;
    profileImageUrl?: string;
}

export const loginUser = async ({ email, password }: userProps) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredentials.user.uid;

        const userProfile = await getUserById(uid);
        return userProfile;
    } catch (error) {
        console.log('Error logging in: ', error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await auth.signOut().then(() => {
            router.replace('/screens/LoginScreen');
        })
    } catch (error) {
        console.log('Error logging out:', error);
        throw error;
    }
};

export const registerUser = async (data: userProps) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password);

        const user = userCredentials.user;
        await setDoc(doc(db, 'users', user.uid), {
            email: data.email,
            userName: data.userName,
            profileImage: data.profileImageUrl || ' ',
        })
    } catch (error) {
        console.log('Error registering user: ', error);
        throw error;
    }
};