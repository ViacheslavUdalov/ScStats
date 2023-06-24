import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import Tournament from "./getTournament";
import {rootStateType, useAppDispatch} from "../../redux/store";
import {useGetAllTournamentsQuery} from "../../redux/RTKtournaments";

const Tournaments = () => {
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [queryTerm, setQueryTerm] = useState('');
    const {data, isLoading} = useGetAllTournamentsQuery(queryTerm);
    console.log(data);
    return (
        <div className="App">
            <input type={'search'}
                   value = {searchTerm}
                   onChange={(e) => {setSearchTerm(e.target.value)}}
                />
            { data && data.map((tournament: TournamentModel, index: number) => {
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