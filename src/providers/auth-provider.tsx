import { clearUser, setAuthChecked, setLoading, setUser } from "@/app/redux/slices/authSlice/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../services/firebaseConfig";

const AuthProvider = ({ children }: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {

            if (firebaseUser) {

                const userData = {
                    id: firebaseUser.uid,
                    email: firebaseUser.email,
                    userName: firebaseUser.displayName || "",
                    profileImage: firebaseUser.photoURL || ""
                };
                dispatch(setUser(userData));
            } else {
                dispatch(clearUser());
            }

            dispatch(setLoading(false));
            dispatch(setAuthChecked(true));

        });

        return unsubscribe;
    }, []);

    return children;
}

export default AuthProvider;
