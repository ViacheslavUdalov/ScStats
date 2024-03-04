import {UserModel} from "./user-model";
import {Match} from "./match";

    export interface TournamentModel {
        Name: string,
        _id: string,
        players: UserModel[],
        Owner: {
            fullName: string,
            avatarURL: string,
            _id: string
        }
        about: string,
        imageUrl: string,

        createdAt: string,

        updatedAt: string

        bracket: UserModel[][][]
    }
export interface DataTournamentModel {
    tournaments: Array<TournamentModel> | [],
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