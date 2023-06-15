import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import instance from "../../api/MainAPI";
import Tournament from "./getTournament";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";

 const Tournaments = () => {
    const [tournaments, setTournaments] = useState<TournamentModel[]>([])
    useEffect(() => {
        instance.get('/tournaments')
            .then((res) => setTournaments(res.data))
    }, [])

    return (
        <div className="App">
            {tournaments.map((tournament: TournamentModel, index: number) => {
                return <div key = {index}>
                    <Tournament
                        tournament = {tournament}
                    />
                </div>
            })}
        </div>
    )
}
export default Tournaments;