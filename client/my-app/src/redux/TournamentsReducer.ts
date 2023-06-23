import {createSlice, createAsyncThunk, AnyAction} from "@reduxjs/toolkit";
// import {DataTournamentModel, TournamentModel} from "../models/tournament-model";
// import {TournamentsAPI} from "../api/tournamentsAPI";
// import {rootStateType} from "./store";
// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
// import {AsyncThunkRejectedActionCreator} from "@reduxjs/toolkit/dist/createAsyncThunk";
//
//
// export const fetchTournaments = createAsyncThunk('tournaments/fetchTournaments', async () => {
//     const data: DataTournamentModel  = await TournamentsAPI.fetchALL()
//     console.log(data);
//     return data;
// })
// export const fetchTournament = createAsyncThunk('tournaments/fetchTournament', async (id: string) => {
//     const data: DataTournamentModel = await TournamentsAPI.fetchOne(id)
//     return data;
// })
// export const fetchDeleteTournaments = createAsyncThunk('tournaments/fetchDeleteTournaments', async (id: string) => {
//     await TournamentsAPI.fetchDelete(id)
// })
//
// const initialState: DataTournamentModel = {
//     tournaments: [] as Array<TournamentModel>,
//     status: 'loading'
// };
//
// const tournamentSlice = createSlice({
//     extraReducers: (builder: AsyncThunkRejectedActionCreator<string, AsyncThunkConfig>) => {
//         builder
//             // .addCase(fetchTournaments.pending, (state: AppStateType) => {
//             //     state.tournaments = [];
//             //     state.status = 'loading'
//             // })
//             // .addCase(fetchTournaments.fulfilled, (state: AppStateType, action) => {
//             //     state.tournaments = action.payload;
//             //     state.status = 'loaded'
//             // })
//             // .addCase(fetchTournaments.rejected, (state: AppStateType, ) => {
//             //     state.tournaments = [];
//             //     state.status = 'error'
//             // })
//             .addCase(fetchTournament.pending, (state: rootStateType) => {
//                 state.tournaments = [];
//                 state.status = 'loading'
//             })
//             .addCase(fetchTournament.fulfilled, (state: rootStateType, action: AnyAction) => {
//                 state.tournaments = action.payload;
//                 state.status = 'loaded'
//             })
//             .addCase(fetchTournament.rejected, (state: rootStateType) => {
//                 state.tournaments = [];
//                 state.status = 'error'
//             })
//             .addCase(fetchDeleteTournaments.pending, (state: rootStateType, action: AnyAction) => {
//                 state.tournaments = state.tournaments.filter((obj: TournamentModel) => obj['_id'] !== action.meta.arg);
//             })
//     },
//     initialState,
//     name: 'tournaments',
//     reducers: {}
// });
//
// export const tournamentReducer = tournamentSlice.reducer;