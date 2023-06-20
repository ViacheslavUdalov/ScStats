export type TournamentModel = {
    Name: string,
    _id: string,
    players: [
        {
        rank: number,
        nickname: {
            type: string
        },
        country: string,
        race: {
            type: string
        },
        rating: number
    }
    ],
    followed: boolean,
    user: {
        fullName: string,
        avatarURL: string,
        _id: string
    }
    about: string,
    imageUrl: string
}
export interface DataTournamentModel {
    items: Array<TournamentModel> | [],
    status: string
}