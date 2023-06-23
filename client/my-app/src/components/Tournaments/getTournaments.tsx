import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import instance from "../../api/MainAPI";
import Tournament from "./getTournament";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType, useAppDispatch} from "../../redux/store";
// import {fetchTournaments} from "../../redux/TournamentsReducer";
import {tournamentsAPI, useGetAllTournamentsQuery} from "../../redux/RTKtournaments";

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