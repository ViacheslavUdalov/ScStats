import {UserModel} from "./user-model";

export interface Match {
    matchDate: Date,
    players: {
        _id: string,
        fullName: string,
        score: number,
        rank: number
        }[]
        winner: {
            _id: string,
            fullName: string,
            rank: number
        } | null
}