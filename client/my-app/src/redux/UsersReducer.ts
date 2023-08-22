
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../api/MainAPI";
import {rootStateType} from "./store";
import {fetchAuth, fetchRegister} from "./authReducer";
import {AuthModel} from "../models/auth-model";
import {TournamentModel} from "../models/tournament-model";
import {UserModel} from "../models/user-model";

export const fetchAllUsers = createAsyncThunk('auth/fetchAllUsers', async () => {
    const response = await instance.get('/users');
    return response.data;
})
const initialState = {
    users: [] as Array<UserModel> | null,
    status: 'loading'
}
const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.status = 'loading'
                state.users = null
            })
            .addCase(fetchAllUsers.fulfilled, (state, action: rootStateType) => {
                state.status = 'loaded'
                state.users = action.payload

            })
            .addCase(fetchAllUsers.rejected, (state) => {
                state.users = null
                state.status = 'error'

            })
    }})
export const UsersReducer = authSlice.reducer;