import { createSlice } from '@reduxjs/toolkit';

export const imageSlice = createSlice({
    name: 'image',
    initialState: {
        imageUrl: null,
    },
    reducers: {
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload;
        },
        clearImage: (state) => {
            state.imageUrl = null;
        }
    }
});

export const { setImageUrl, clearImage} = imageSlice.actions;
export default imageSlice.reducer;