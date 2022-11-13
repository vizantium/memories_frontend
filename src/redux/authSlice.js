import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../api/index'

export const signIn = createAsyncThunk('authSlice/signIn', async ({formData}) => {
    const {data} = await axios.post('/users/signin', formData)
    return data
})

export const signUp = createAsyncThunk('authSlice/signUp', async ({formData}) => {
    const {data} = await axios.post('/users/signup', formData)
    return data
})

const initialState = {
    authData: null
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        auth: (state, action) => {
            localStorage.setItem('profile', JSON.stringify({... action?.payload}))
            state.authData = action.payload
        },
        logout: (state, action) => {
            localStorage.clear()
            state.authData = null
        }
    },
    extraReducers: {
        [signIn.fulfilled]: (state, action) => {
            localStorage.setItem('profile', JSON.stringify({... action?.payload}))
            state.authData = action.payload
        },
        [signUp.fulfilled]: (state, action) => {
            localStorage.setItem('profile', JSON.stringify({... action?.payload}))
            state.authData = action.payload
        }

    }
})

export const { auth, logout } = authSlice.actions


export const authReducer = authSlice.reducer;
