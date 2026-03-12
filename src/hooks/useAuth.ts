import { useSelector } from "react-redux";
import { auth } from "../services/firebaseConfig";

export const useAuth = ( ) => {
    const user = useSelector((state: any) => state.authReducer.user);

    const uid = user?.uid || auth.currentUser?.uid;

    return {
        uid,
        user,
        isLoggedIn: !!uid,
    }
}