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
    Owner: {
        fullName: string,
        avatarURL: string,
        _id: string
    }
    about: string,
    imageUrl: string
}
export interface DataTournamentModel {
    tournaments: Array<TournamentModel> | [],
    totalCount: number
}
export interface queryParams {
    searchTerm: string,
    page: number,
    perPage: number
}