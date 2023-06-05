import React, {useEffect, useState} from "react";
import {TournamentModel} from "../models/tournament-model";
import axios from "axios";
import {PlayersModel} from "../models/Players-model";

const Players = () => {
    const [players, setPlayers] = useState<PlayersModel[]>([])
    useEffect(() => {
        axios.get('http://localhost:3000/api/players')
            .then((res) => setPlayers(res.data))
    }, [])
    console.log(players);
return <div>
    {players.map((player: PlayersModel, index) => {
        return <div key={index}>
            {player.country}
            {player.nickname}
        </div>
    })}
</div>
}
export default Players;