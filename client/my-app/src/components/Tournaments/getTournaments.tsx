import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import instance from "../../api/MainAPI";

 const Tournaments = () => {
    const [tournaments, setTournaments] = useState<TournamentModel[]>([])
    useEffect(() => {
        instance.get('/tournaments')
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