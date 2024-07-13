import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        credentials: {},
    },
    reducers: {
        setUser: (state, action) => {
            state.isLoggedIn = true;
            state.credentials = action.payload;
        },
        clearUser: (state) => {
            state.isLoggedIn = false;
            state.credentials = {};
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
