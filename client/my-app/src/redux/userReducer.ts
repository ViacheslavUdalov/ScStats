import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../api/MainAPI";
import {rootStateType} from "./store";
import {UserModel} from "../models/user-model";
import {CalculateRatingChange} from "../helpers/eloCalculator";
import {Match} from "../models/match";

export const getOneUser = createAsyncThunk('auth/getOneUser', async (id: string) => {
    const response = await instance.get(`/user/${id}`);
    return response.data;
})
export const updateUserRank = createAsyncThunk('auth/updateUserRank', async ({playerOne, playerTwo, result, currMatch} : {playerOne: UserModel, playerTwo: UserModel, result: number, currMatch: Match}) => {
    playerOne.rank = playerOne.rank + CalculateRatingChange(playerOne.rank, playerTwo.rank, result);
    playerOne.matches = [...playerOne.matches, currMatch]
    const response =  await instance.patch(`/user/editrankandmatchhistory/${playerOne._id}`, playerOne)
    return response.data;
})
const initialState = {
    data: null as UserModel | null,
    isLoading: false
}
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(getOneUser.pending, (state) => {
                state.isLoading = true
                state.data = null
            })
            .addCase(getOneUser.fulfilled, (state, action: rootStateType) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(getOneUser.rejected, (state) => {
                state.isLoading = false
                state.data = null
            })
            .addCase(updateUserRank.pending, (state) => {
                state.isLoading = true
                state.data = null
            })
            .addCase(updateUserRank.fulfilled, (state, action: rootStateType) => {
                state.isLoading = false
                state.data = action.payload;
            })
            .addCase(updateUserRank.rejected, (state) => {
                state.isLoading = false
                state.data = null
            })
    }})
export const UserReducer = userSlice.reducer;