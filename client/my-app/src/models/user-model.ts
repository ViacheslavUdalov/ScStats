import {Match} from "./match";

export type UserModel = {
    _id: string
    fullName: string,
    email: string,
    avatarURL: string,
    rank: number,
    country: string,
    race: string,
    createdAt: string,
    matches: Match[]
}
export type UserModelForTournament = {
    _id: string
    fullName: string,
    score: number,
    rank: number
}