export interface PlayerBracket {
    _id: string,
    fullName: string,
    score: number
}
export interface PlayerBracketWithoutScore {
    _id: string,
    fullName: string
}
export interface TournamentOwner {
    _id?: string,
    fullName?: string,
     avatar?: string
}