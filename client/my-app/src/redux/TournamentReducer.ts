import {createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import instance from "../api/MainAPI";
import {DataTournamentModel, TournamentModel} from "../models/tournament-model";
import {UserModel} from "../models/user-model";
import {rootStateType} from "./store";
import players from "../components/Players/Players";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;


export const fetchTournament = createAsyncThunk('tournaments/fetchTournament', async (id: string) => {
    const data = await instance.get(`tournaments/${id}`)
    if (data.status === 200) {
    return data.data;
        }
})
export const deleteTournament = createAsyncThunk('tournaments/deleteTournament', async (id: string) => {
    const data = await instance.delete(`tournaments/${id}`)
    if (data.status === 200) {
        return data.data;
    }
})
export const leaveFromTournament = createAsyncThunk('tournaments/leaveFromTournament', async ({localTournament, currentClient} : {localTournament: TournamentModel, currentClient: UserModel}) => {
    const isParticipant = localTournament.players.some((player: UserModel) => player._id === currentClient._id)
   if (isParticipant) {
       const updatePlayers = localTournament.players.filter((player: UserModel) => player._id !== currentClient._id)
       const updateTournament = {
           ...localTournament,
           players: updatePlayers
       }
       const data = await instance.patch(`/tournaments/${localTournament._id}`, updateTournament);
       if (data.status === 200) {
           return data.data;
       }
   }
})
export const followTournament = createAsyncThunk('tournaments/followTournament', async ({localTournament, currentClient} : {localTournament: TournamentModel, currentClient: UserModel}) => {
   const isParticipant = localTournament.players.some((player: UserModel) => player._id === currentClient._id)
    if (!isParticipant) {
        const updatePlayers = [...localTournament.players, currentClient]
        const updateTournament = {
            ...localTournament,
            players: updatePlayers
        }
        const data = await instance.patch(`/tournaments/${updateTournament._id}`, updateTournament);
        if (data.status === 200) {
            return data.data;
        }
    }
    else {

    }
    })
export const createBracket = createAsyncThunk('tournaments/createBracket', async ({localTournament, currentClient} : {localTournament: TournamentModel, currentClient: UserModel}) => {

    const updatePlayers = [...localTournament.players, currentClient]
    const updateTournament = {
        ...localTournament,
        players: updatePlayers
    }
    const data =  await instance.patch(`/tournaments/${updateTournament._id}`, updateTournament);
    if (data.status === 200) {
        return data.data;
    }

})

export const tournamentSlice = createSlice({
    name: 'tournament',
    initialState: {
        data: null as TournamentModel | null,
        isParticipating: false,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteTournament.pending, (state) => {
                state.isLoading = true;
                state.data = null;
            })
            .addCase(deleteTournament.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = null;
            })
            .addCase(deleteTournament.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
            })
            .addCase(fetchTournament.pending, (state) => {
                state.isLoading = true;
                state.data = null;
            })
            .addCase(fetchTournament.fulfilled, (state, action: rootStateType) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchTournament.rejected, (state) => {
                state.isLoading = false;
                state.data = null;
            })
            .addCase(leaveFromTournament.pending, (state) => {
                state.isParticipating = true;
                state.isLoading = true;
                state.data = null;
            })
            .addCase(leaveFromTournament.fulfilled, (state, action: rootStateType) => {
                state.isLoading = false;
                state.isParticipating = false;
                state.data = action.payload;
            })
            .addCase(leaveFromTournament.rejected, (state, action) => {
                state.isLoading = false;
                state.isParticipating = true;
                state.data = null;
            })
            .addCase(followTournament.pending, (state) => {
                state.isLoading = true;
                state.isParticipating = false;
                state.data = null;
            })
            .addCase(followTournament.fulfilled, (state, action: rootStateType) => {
                state.isLoading = false;
                state.isParticipating = true;
                state.data = action.payload;
            })
            .addCase(followTournament.rejected, (state) => {
                state.isLoading = false;
                state.isParticipating = false;
                state.data = null;
            })
    },
})

export const tournamentReducer = tournamentSlice.reducer;