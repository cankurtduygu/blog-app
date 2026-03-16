import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserInfo: (state, { payload }) => {
        if(payload.user){
            const { email, username, isAdmin } = payload.user;//paload icinde bir suru sey geliyor sadece bu verileri alsak yeterli olur.
            state.currentUser = { email, username, isAdmin };
        } else {
            const { email, username, isAdmin } = payload.data;
            state.currentUser = { email, username, isAdmin };
        }
        state.token = payload.token;
    },
  },
})

export const { updateUserInfo } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.currentUser;//useSelectorda uzun uzun yazmamaik icin burda bu sekilde yazyioruz.
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer