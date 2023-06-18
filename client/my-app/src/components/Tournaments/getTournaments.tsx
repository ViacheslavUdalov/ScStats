import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import instance from "../../api/MainAPI";
import Tournament from "./getTournament";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../redux/store";
import {fetchTournaments} from "../../redux/TournamentsReducer";

const Tournaments = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
       dispatch(fetchTournaments())
    }, [])
    const tournaments = useSelector((state: AppStateType) => state.tournaments.tournaments);
    console.log(tournaments)
    return (
        <div className="App">
            {tournaments.items.map((tournament: TournamentModel, index: number) => {
                return <div key={index}>
                    <Tournament
                        tournament={tournament}
                    />
                </div>
            })}
        </div>
    )
}
export default Tournaments;