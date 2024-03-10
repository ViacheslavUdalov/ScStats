export interface PlayerBracket {
    _id: string,
    fullName: string,
    score: number,
    rank: number
}
export interface PlayerBracketWithoutScore {
    _id: string,
    fullName: string,
    rank: number
}
export interface TournamentOwner {
    _id?: string,
    fullName?: string,
     avatar?: string
}