import {configureStore, createSlice} from "@reduxjs/toolkit"
import { NIL as NIL_UUID } from 'uuid';

const initialStateGuestLogin = {value: {username: "", userid: NIL_UUID,}};
const akun = createSlice({
    name: "Fungsi Akun",
    initialState: initialStateGuestLogin, 
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },

        logout: (state) => {
            state.value = initialStateGuestLogin;
        }
    }
})

export const {login, logout} = akun.actions

export const store = configureStore({
    reducer: {
        akun: akun.reducer,
    }
})