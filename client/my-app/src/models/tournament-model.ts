export type TournamentModel = {
    Name: string,
    _id: string,
    players: [
        {
            fullName: string,
            avatarURL: string,
    }
    ],
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