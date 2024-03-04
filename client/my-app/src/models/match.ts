import {UserModel} from "./user-model";

export interface Match {
    // matchDate: Date,
    players: [{
        _id: string,
        fullName: string
    }]
        winner: {
            _id: string,
            fullName: string
        }
}