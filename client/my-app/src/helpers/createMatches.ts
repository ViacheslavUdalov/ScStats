import {UserModel} from "../models/user-model";
import {Simulate} from "react-dom/test-utils";
import {Match} from "../models/match";

export const simulateMatches = (players: UserModel[]) => {
    const usedPlayers = new Set<string>();
    const matches: Match[] = [];
    for (let i = 0; i < players.length - 1; i++) {
        for (let j = i + 1; j < players.length; j++) {
            const playerId1 = players[i]._id
            const playerId2 = players[j]._id;
            const pair = [players[i], players[j]].sort();
            const isPlayedAlready = pair.some(player => usedPlayers.has(player._id));
            if (!isPlayedAlready) {
                matches.push({
                    matchDate: new Date(),
                    players: [
                        {_id: playerId1, fullName: players[i].fullName, score: 0},
                        {_id: playerId2, fullName: players[j].fullName, score: 0}
                    ],
                    winner: null
                })
                pair.forEach(player => usedPlayers.add(player._id));
            }
        }
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