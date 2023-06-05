import {TournamentModel} from "../models/tournament-model";
import {ActionsTypes, BaseThunkType} from "./store";
import {Dispatch} from "redux";
import {tournamentsAPI} from "../api/tournamentsAPI";

const initialState = {
    tournaments: [] as Array<TournamentModel>
}
const TournamentsReducer = (state = initialState, action: ActionsType) => {
switch (action.type) {
    case 'GETTOURNAMENTS':
        return {...state, tournaments: action.tournaments}
}
}
export const actions = {
    SetTournaments: (tournaments: Array<TournamentModel>) =>
        ({type: 'GETTOURNAMENTS', tournaments} as const)
}
export const getTournaments = (): ThunkType => async (dispatch) => {
let data = await tournamentsAPI.setTournaments()
    // dispatch(actions.SetTournaments(data.))
    console.log(data)
}
type ThunkType = BaseThunkType<ActionsType>
type DispatchType = Dispatch<ActionsType>
type ActionsType = ActionsTypes<typeof actions>
export default TournamentsReducer;