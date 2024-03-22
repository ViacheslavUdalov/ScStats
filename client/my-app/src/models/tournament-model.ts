import {UserModel} from "./user-model";
import {Match} from "./match";

    export interface TournamentModel {
        Name: string,
        _id: string,
        players: UserModel[],
        Owner: UserModel,
        about: string,
        imageUrl: string,

        createdAt: string,

        updatedAt: string

        bracket: Match[][]
    }
export interface DataTournamentModel {
    tournaments: Array<TournamentModel> | [],
    totalCount: number
}
export interface CommonDataModel<T> {
    data: Array<T> | [],
    totalCount: number
}
export interface DataUsersModel {
    users: Array<UserModel> | [],
    totalUsersCount: number
}
export interface queryParams {
    searchTerm: string,
    page: number,
    perPage: number
}