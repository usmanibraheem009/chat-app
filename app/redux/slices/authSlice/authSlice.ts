import { createSlice } from "@reduxjs/toolkit";

export interface AuthUser {
    uid: string;
    email: string | null;
    userName: string;
    profileImage: string;
}

interface AuthState {
    user: AuthUser | null;
    loading: boolean;
    authChecked: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: true,
    authChecked: false,
};

export const authSlice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setAuthChecked: (state, action) => {
            state.authChecked = action.payload
        },
    },
});

export const { setUser, clearUser, setLoading, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;