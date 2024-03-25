import {createSlice, createAsyncThunk, AnyAction} from "@reduxjs/toolkit";
import {CommonDataModel, DataTournamentModel, TournamentModel} from "../models/tournament-model";
import {rootStateType} from "./store";
import instance from "../api/MainAPI";

interface ParamsType {
    searchTerm: string,
    page: number,
    perPage: number
}

export const fetchTournaments = createAsyncThunk('tournaments/fetchTournaments', async (params: ParamsType) => {
    const data = await
        instance.get(`tournaments?searchTerm=${params.searchTerm}&page=${params.page}&perPage=${params.perPage}`)
    if (data.status === 200) {
        return data.data;
    } else {
        return data.statusText
    }
})

interface InitialStateType {
    tournaments: CommonDataModel<TournamentModel> | null
    isLoading: boolean
}

const initialState: InitialStateType = {
    tournaments:  {data: [], totalCount: 0},
    isLoading: false
};

const tournamentSlice = createSlice({
    initialState,
    name: 'tournaments',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTournaments.pending, (state) => {
                state.tournaments = null;
                state.isLoading = true
            })
            .addCase(fetchTournaments.fulfilled, (state, action: rootStateType) => {
                state.tournaments = action.payload;
                state.isLoading = false
            })
            .addCase(fetchTournaments.rejected, (state) => {
                state.tournaments = null;
                state.isLoading = false
            })
    },
});

export const tournamentsReducer = tournamentSlice.reducer;