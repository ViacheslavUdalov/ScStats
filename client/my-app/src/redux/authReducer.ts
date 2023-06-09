import {createSlice, createAsyncThunk, AnyAction} from "@reduxjs/toolkit";
import instance from "../api/MainAPI";
import {AuthModel, RegisterModel} from "../models/auth-model";
import {rootStateType} from "./store";

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params: AuthModel, thunkAPI) => {
    const response = await instance.post('auth/login', params);
    return response.data;
})
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const response = await instance.get('auth/me');
    return response.data;
})
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: RegisterModel) => {
    const response = await instance.post('auth/register', params);
    return response.data;
})
const initialState = {
    data: null as AuthModel | null,
    status: 'loading'
}
// @ts-ignore
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: rootStateType) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading'
                state.data = null
            })
            .addCase(fetchAuth.fulfilled, (state, action: rootStateType) => {
                state.status = 'loaded'
                state.data = action.payload

            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = 'error'
                state.data = null
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading'
                state.data = null
            })
            .addCase(fetchAuthMe.fulfilled, (state, action: AnyAction) => {
                state.status = 'loaded'
                state.data = action.payload

            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error'
                state.data = null
            })
    }
});
export const selectIsAuth = (state: rootStateType) => Boolean(state.auth.data)
// @ts-ignore
export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;