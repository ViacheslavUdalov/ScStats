import {createSlice, createAsyncThunk, AnyAction} from "@reduxjs/toolkit";
import {DataTournamentModel, TournamentModel} from "../models/tournament-model";
import {TournamentsAPI} from "../api/tournamentsAPI";
import {rootStateType} from "./store";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {AsyncThunkRejectedActionCreator} from "@reduxjs/toolkit/dist/createAsyncThunk";


// export const fetchTournaments = createAsyncThunk('tournaments/fetchTournaments', async () => {
//     const data: DataTournamentModel  = await TournamentsAPI.fetchALL()
//     console.log(data);
//     return data;
// })
export const fetchTournament = createAsyncThunk('tournaments/fetchTournament', async (id: string) => {
    const data: DataTournamentModel = await TournamentsAPI.fetchOne(id)
    return data;
})
// export const fetchDeleteTournaments = createAsyncThunk('tournaments/fetchDeleteTournaments', async (id: string) => {
//     await TournamentsAPI.fetchDelete(id)
// })
//
const initialState = {
    tournaments: [] as Array<TournamentModel>,
    tournament: null as TournamentModel | null,
    status: 'loading'
};

const tournamentSlice = createSlice({
    initialState,
    name: 'tournaments',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTournament.pending, (state) => {
                state.tournament = null;
                state.status = 'loading'
            })
            .addCase(fetchTournament.fulfilled, (state, action: rootStateType) => {
                state.tournament = action.payload;
                state.status = 'loaded'
            })
            .addCase(fetchTournament.rejected, (state) => {
                state.tournament = null;
                state.status = 'error'
            })
    },

});

export const tournamentsReducer = tournamentSlice.reducer;