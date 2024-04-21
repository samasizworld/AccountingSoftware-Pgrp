import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = 'http://localhost:5000/';

export interface IAuthState {
    authKey: string;
    authenticated: boolean;
    userName: string;
}

export interface IloginCred {
    Username?: string;
    Password?: string;
}

const initialState: IAuthState = {
    authenticated: false,
    authKey: '',
    userName: ''
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => {
            sessionStorage.clear();
            return initialState;
        },
        getCurrentSession: (state) => {
            state.authKey = sessionStorage.getItem('token') || ''
            state.authenticated = Boolean(sessionStorage.getItem('authenticated'))
            state.userName = sessionStorage.getItem('userName') || ''
            return state;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            sessionStorage.setItem('token', action.payload.AuthenticationKey)
            sessionStorage.setItem('authenticated', 'true')
            sessionStorage.setItem('userName', action.payload.Username)

            state.authKey = action.payload.AuthenticationKey
            state.authenticated = true
            state.userName = action.payload.Username
            return state;
        }
        )
    }
});

export const login = createAsyncThunk('login/loginAsync', async (body: IloginCred) => {
    try {
        const response = await axios.post(`${url}Login`, body, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }

})

export const { logout,getCurrentSession } = authSlice.actions;
export const authReducer = authSlice.reducer;