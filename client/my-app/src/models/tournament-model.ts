export type TournamentModel = {
    Name: String,
    players: [
        {
        rank: Number,
        nickname: {
            type: String
        },
        country: String,
        race: {
            type: String
        },
        rating: Number
    }
    ],
    user: {
        fullName: string,
        avatarURL: string
    }
    about: String,
    tournamentAvatar: String
}