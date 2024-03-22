
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../api/MainAPI";
import {rootStateType} from "./store";
import {fetchAuth, fetchRegister} from "./authReducer";
import {AuthModel} from "../models/auth-model";
import {CommonDataModel, TournamentModel} from "../models/tournament-model";
import {UserModel, UsersGetParams} from "../models/user-model";

export const fetchAllUsers = createAsyncThunk('auth/fetchAllUsers', async (params: UsersGetParams) => {
    const response = await instance.get(`users?searchTerm=${params.searchTerm}&pageIndex=${params.pageIndex}&perPage=${params.perPage}`);
    if (response.status === 200) {
        return response.data;
    } else {
        return response.status
    }

})
interface InitialStateType {
    users: CommonDataModel<UserModel> | null,
    isLoading: boolean
}
const initialState: InitialStateType= {
    users: {data: [], totalCount: 0},
    isLoading: false
}
const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading= true
                state.users = null
            })
            .addCase(fetchAllUsers.fulfilled, (state, action: rootStateType) => {
                state.isLoading = false
                state.users = action.payload

            })
            .addCase(fetchAllUsers.rejected, (state) => {
                state.users = null
                state.isLoading = false

            })
    }})
export const UsersReducer = authSlice.reducer;