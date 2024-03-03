import {UserModel} from "./user-model";

export interface Match {
    matchDate: Date,
    // players: [{
    //     _id: string,
    //     fullName: string
    // }]
        matchResult: {
        winner: {
            _id: string,
            fullName: string
        },
            loser: {
                _id: string,
                fullName: string
            }
    }
}