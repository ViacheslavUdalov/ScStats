export type TournamentModel = {
    Name: string,
    _id: string | undefined,
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
    user: {
        fullName: string,
        avatarURL: string,
        _id: number
    }
    about: string,
    imageUrl: string
}