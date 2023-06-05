import React, {useEffect, useState} from "react";
import {TournamentModel} from "../models/tournament-model";
import axios from "axios";
import {getTournaments} from "../redux/TournamentsReducer";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../redux/store";
import {PlayersModel} from "../models/Players-model";

 const Tournaments = () => {
    const [tournaments, setTournaments] = useState<TournamentModel[]>([])
    useEffect(() => {
        axios.get('http://localhost:3000/api/tournaments')
            .then((res) => setTournaments(res.data))
    }, [])

    return (
        <div className="App">
            {tournaments.map((tournament: TournamentModel, index) => {
                return <div key={index}>
                    {tournament.Name}
                    {tournament.about}
                    {tournament.players.map((player: any) => {
                      return  <div>
                          {player.nickname}
                          {player.race}
                          {player.rank}
                        </div>
                    })}
                </div>
            })}
        </div>
    )
}
export default Tournaments;