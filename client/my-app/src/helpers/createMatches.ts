import {UserModel} from "../models/user-model";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

export const simulateMatches = (players: UserModel[]) => {
    const playedPlayers = new Set<UserModel>();
    const uniqpairs: UserModel[][] = [];
    for (const player of players) {
        if (!playedPlayers.has(player)) {
            let randomIndex = Math.floor(Math.random() * players.length)
            while (playedPlayers.has(players[randomIndex]) || randomIndex === players.indexOf(player)) randomIndex = Math.floor(Math.random() * players.length);
            const pair = [player, players[randomIndex]].sort((a, b) => a._id.localeCompare(b._id));
            uniqpairs.push(pair);
            playedPlayers.add(player);
            playedPlayers.add(players[randomIndex]);
        }
    }
    return uniqpairs;
}
// return(
//     (existingPair[0]._id === pair[0]._id && existingPair[1]._id === pair[1]._id) ||
//     (existingPair[0]._id === pair[1]._id && existingPair[1]._id === pair[0]._id)
// );
// let matches = [];
// while (uniqpairs.length > 0) {
//     let randomIndex = Math.floor(Math.random() * uniqpairs.length);
//     let [player1, player2] = uniqpairs[randomIndex];
// matches.push(createMatch(player1, player2));
// uniqpairs.splice(randomIndex, 1)
// }
// return matches;
export const generateBracket = (result: any, arrayOfPlayersLength: number): any[][][] => {
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
const createMatch = (player1: UserModel, player2: UserModel) => {
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
        matchResult: [{
            output: 'win',
            gamesWin: 1,
            gamesLost: 0,
            player: winner
        },
            {
                output: 'loss',
                gamesWin: 0,
                gamesLost: 1,
                player: loser
            }]
    }
    return match;
}