import {UserModel} from "./user-model";

export interface Match {
    matchDate: Date,
    players: [{
        _id: string,
        fullName: string,
        score: number
        }, {
        _id: string,
        fullName: string,
        score: number
    }]
        winner: {
            _id: string,
            fullName: string
        } | null
}