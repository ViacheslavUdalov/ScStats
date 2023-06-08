import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../api/MainAPI";
import {AppStateType} from "./store";

export const fetchTournaments = createAsyncThunk('tournaments/fetchTournaments', async () => {
    const {data} = await instance.get('/tournaments')
    return data;
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
    }
});
        export const tournamentReducer = tournamentSlice.reducer;