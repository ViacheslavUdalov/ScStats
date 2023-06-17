import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../api/MainAPI";
import {AppStateType} from "./store";

export const fetchTournaments = createAsyncThunk('tournaments/fetchTournaments', async () => {
    const {data} = await instance.get('/tournaments')
    return data;
})
export const fetchTournament = createAsyncThunk('tournaments/fetchTournament', async (id:string) => {
    const {data} = await instance.get(`/tournaments${id}`)
    return data;
})
export const fetchDeleteTournaments = createAsyncThunk('tournaments/fetchDeleteTournaments', async (id:string) => {
    await instance.delete(`/tournaments/${id}`)
})
const initialState = {
    tournaments: {
        items: [],
        status: 'loading'
    }
};

const tournamentSlice = createSlice({
    name: 'tournaments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTournaments.pending, (state) => {
                state.tournaments.items = [];
                state.tournaments.status = 'loading'
            })
            .addCase(fetchTournaments.fulfilled, (state, action) => {
                state.tournaments.items = action.payload;
                state.tournaments.status = 'loaded'
            })
            .addCase(fetchTournaments.rejected, (state, ) => {
                state.tournaments.items = [];
                state.tournaments.status = 'error'
            })
            .addCase(fetchTournament.pending, (state) => {
                state.tournaments.items = [];
                state.tournaments.status = 'loading'
            })
            .addCase(fetchTournament.fulfilled, (state, action) => {
                state.tournaments.items = action.payload;
                state.tournaments.status = 'loaded'
            })
            .addCase(fetchTournament.rejected, (state, ) => {
                state.tournaments.items = [];
                state.tournaments.status = 'error'
            })
            .addCase(fetchDeleteTournaments.pending, (state) => {
                state.tournaments.items = [];
                state.tournaments.status = 'loading'
            })
            .addCase(fetchDeleteTournaments.fulfilled, (state, action) => {
                state.tournaments.items = state.tournaments.items.filter((obj) => obj['_id'] !== action.meta.arg);
                state.tournaments.status = 'loaded'
            })
    }
});
        export const tournamentReducer = tournamentSlice.reducer;