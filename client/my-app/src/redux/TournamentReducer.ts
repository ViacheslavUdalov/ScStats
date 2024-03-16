import {createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import instance from "../api/MainAPI";
import {DataTournamentModel, TournamentModel} from "../models/tournament-model";
import {UserModel} from "../models/user-model";
import {rootStateType} from "./store";
import players from "../components/Players/Players";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;
import {PlayerBracket} from "../models/PlayerBracket";
import {Match} from "../models/match";
import {generateBracket, simulateMatches} from "../helpers/createMatches";


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
return 'Уже учатсвуете в турнире'
    }
    })
export const createBracketAsync = createAsyncThunk('tournaments/createBracket', async (tournament: TournamentModel) => {
    if (tournament.players && tournament.players.length > 3) {
        let insideBracket = [simulateMatches(tournament.players)];
        console.log(insideBracket)
        let bracketForServer = generateBracket(insideBracket, insideBracket[0].length)
        console.log(bracketForServer)
        let response = await instance.patch(`/tournaments/${tournament?._id}`, {
            ...tournament,
            bracket: bracketForServer
        });
        if (response.status == 200) {
            return response.data;
        } else {
            return response.status
        }
    } else {
        return 'количество игроков недостаточно'
    }
})
export const updateTournamentData = createAsyncThunk('tournaments/updateTournamentData', async ({tournament, updatedBracket} : {tournament: TournamentModel, updatedBracket: Match[][]}) => {

    const data =  await instance.patch(`/tournaments/${tournament._id}`, {
        ...tournament,
        bracket: updatedBracket
    });
    if (data.status === 200) {
        return data.data;
    }

})
interface TournamentState {
    data: TournamentModel | null,
    isParticipating: boolean,
    isLoading: boolean
}
const initialState : TournamentState= {
    data: null as TournamentModel | null,
    isParticipating: false,
    isLoading: false,
}
export const tournamentSlice = createSlice({
    name: 'tournament',
    initialState: initialState,
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
            .addCase(createBracketAsync.pending, (state) => {
                state.isLoading = true;
                state.data = null;
            })
            .addCase(createBracketAsync.fulfilled, (state) => {
                state.isLoading = false;
                state.data = null;
            })
            .addCase(createBracketAsync.rejected, (state) => {
                state.isLoading = false;
                state.data = null;
            })
            .addCase(updateTournamentData.pending, (state) => {
                state.isLoading = true;
                state.data = null;
            })
            .addCase(updateTournamentData.fulfilled, (state, action: rootStateType) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updateTournamentData.rejected, (state) => {
                state.isLoading = false;
                state.data = null;
            })
    },
})

export const tournamentReducer = tournamentSlice.reducer;