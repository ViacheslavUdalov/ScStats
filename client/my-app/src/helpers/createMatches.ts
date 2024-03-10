import {UserModel} from "../models/user-model";
import {Simulate} from "react-dom/test-utils";
import {Match} from "../models/match";

export const simulateMatches = (players: UserModel[]) => {
    const usedPlayers = new Set<string>();
    const matches: Match[] = [];
    for (const player of players) {
        let randomIndex = Math.floor(Math.random() * players.length)
            const playerId1 = player._id;
        while (players[randomIndex]._id === player._id) {
            randomIndex = Math.floor(Math.random() * players.length);
        }
            const playerId2 = players[randomIndex]._id;
            const pair = [player, players[randomIndex]].sort();
            const isPlayedAlready = pair.some(player => usedPlayers.has(player._id));
            if (!isPlayedAlready) {
                matches.push({
                    matchDate: new Date(),
                    players: [
                        {_id: playerId1, fullName: player.fullName, score: 0, rank: player.rank},
                        {_id: playerId2, fullName: players[randomIndex].fullName, score: 0, rank: player.rank}
                    ],
                    winner: null
                })
                pair.forEach(player => usedPlayers.add(player._id));
            }
    }
    return matches;
}
// const playedPlayers = new Set<UserModel>();
//     const uniqpairs: UserModel[][] = [];
//     for (const player of players) {
//         if (!playedPlayers.has(player)) {
//             let randomIndex = Math.floor(Math.random() * players.length)
//             while (playedPlayers.has(players[randomIndex]) || randomIndex === players.indexOf(player)) randomIndex = Math.floor(Math.random() * players.length);
//             const pair = [player, players[randomIndex]].sort((a, b) => a._id.localeCompare(b._id));
//             uniqpairs.push(pair);
//             playedPlayers.add(player);
//             playedPlayers.add(players[randomIndex]);
//         }
//     }
//     return uniqpairs;
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