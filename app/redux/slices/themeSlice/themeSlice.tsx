import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type themeMode = 'light' | 'dark' | 'system';

interface themeState {
    currentMode: themeMode,
};

const initialState : themeState = {
    currentMode: 'system',
}

export const ThemeSlice = createSlice({
    name: 'themeMode',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<themeMode>) => {
            state.currentMode = action.payload;
        }
    }
});

export const {setTheme} = ThemeSlice.actions;
export default ThemeSlice.reducer;