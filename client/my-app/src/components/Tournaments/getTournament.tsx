import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import instance from "../../api/MainAPI";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
type props = {
    tournament: TournamentModel
}
const Tournament = ({tournament}: props) => {
    const userData = useSelector((state: AppStateType) => state.auth.data)
    console.log(tournament);
    console.log(userData);
        return (
        <div className="App">
            <h1>{tournament.Name}</h1>
                   <h3> {tournament.about}</h3>
                    {tournament.players.map((player: any, index: number) => {
                        return  <div key={index}>
                            {player.nickname}
                            {player.race}
                            {player.rank}
                        </div>
                    })}
            <div>
                {userData?._id == tournament.user._id &&
                    <div>
                        <button>удалить</button>
                        <button>редактировать</button>
                    </div>
                }
            </div>
                </div>
    )
}
export default Tournament;