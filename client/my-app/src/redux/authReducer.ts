import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../api/MainAPI";
import {useParams} from "react-router-dom";
import {AuthModel} from "../models/auth-model";
import {AppStateType} from "./store";
import App from "../App";

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params: AuthModel, thunkAPI) => {
    const response = await instance.post('auth/login', params);
    return response.data as AuthModel;
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
        logout: (state: AppStateType) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading'
                state.data = null
            })
            .addCase(fetchAuth.fulfilled, (state, action: AppStateType) => {
                state.status = 'loaded'
                state.data = action.payload

            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = 'error'
                state.data = null

            })
    }
});
export const selectIsAuth = (state: AppStateType) => Boolean(state.auth.data)
// @ts-ignore
export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;