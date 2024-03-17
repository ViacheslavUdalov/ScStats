import {UserModel} from "../models/user-model";
import {Match} from "../models/match";

export const simulateMatches = (players: UserModel[]) => {

    const usedPlayers = new Set<string>();
    const matches: Match[] = [];
    let playersLength = players.length % 2 !== 0 ? players.length - 1 : players.length;
    let availableIndexes = Array.from(Array(playersLength).keys());



    for (let i = 0; i < playersLength; i++) {

        let randomIndex = Math.floor(Math.random() * availableIndexes.length)
        const playerIndex1 = i;

        const playerId1 = players[playerIndex1]._id;


        while (randomIndex === i) {
            randomIndex = Math.floor(Math.random() * players.length);
        }
        const playerIndex2 = availableIndexes[randomIndex];
        const playerId2 = players[playerIndex2]._id;
            const pair = [players[i], players[randomIndex]];
            const isPlayedAlready = pair.some(player => usedPlayers.has(player._id));

            if (!isPlayedAlready) {

                matches.push({
                    matchDate: new Date(),
                    players: [
                        {_id: playerId1, fullName: players[i].fullName, score: 0, rank: players[i].rank},
                        {_id: playerId2, fullName: players[randomIndex].fullName, score: 0, rank: players[randomIndex].rank}
                    ],
                    winner: null
                })

                pair.forEach(player => usedPlayers.add(players[i]._id));
            }
            availableIndexes.splice(randomIndex, 1);
    }
    if (players.length % 2 !== 0) {
        matches.push({
            matchDate: new Date(),
            players: [
                {_id: players[playersLength]._id, fullName: players[playersLength].fullName, score: 99, rank: players[playersLength].rank}],
            winner: null
        });
        usedPlayers.add(players[playersLength]._id)
    }
    return matches;
}
export const generateBracket = (result: any, arrayOfPlayersLength: number): any[][] => {
    let outPutResult: [][] = [];
    if (arrayOfPlayersLength <= 1) {
        return result;
    }
    for (let i = 0; i < Math.ceil(arrayOfPlayersLength / 2); i++) {
        let currArray: [] = [];
        outPutResult.push(currArray);
    }
    result.push(outPutResult);
    return generateBracket(result, Math.ceil(arrayOfPlayersLength / 2));
}
const createMatchResult = (player1: UserModel, player2: UserModel) => {
    let winner, loser;
    let index = Math.random();
    if (index < 0.5) {
        winner = player1;
        loser = player2;
    } else {
        loser = player1;
        winner = player2;
    }
    let match = {

        matchDate: Date.now(),
        matchResult: []
    }
    return match;
}