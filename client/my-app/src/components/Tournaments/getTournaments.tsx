import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import Tournament from "./getTournament";
import {useGetAllTournamentsQuery} from "../../redux/RTKtournaments";
import {useDebounce} from "../../helpers/debounce";
import PreLoader from "../../helpers/isLoading";
import {createPages} from "../../helpers/Paginator";
import styles from './Tournaments.module.css';

const Tournaments = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const debounce = useDebounce(searchTerm);
    const {data: DataTournamentModel, error, isLoading} =
        useGetAllTournamentsQuery({
            searchTerm: debounce,
            page: currentPage,
            perPage: perPage
        });
    const totalCount = DataTournamentModel?.totalCount
    const pagesCount = totalCount ? Math.ceil(totalCount / perPage) : 0;
    const pages: Array<number> = [];
    createPages(pages, pagesCount, currentPage)
    console.log(DataTournamentModel);
    if (isLoading) {
        return <PreLoader/>
    }
    return (
        <div className="App">
            <input type={'search'}
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
            />
            {DataTournamentModel && DataTournamentModel.tournaments.length == 0 &&
                <span>Не найдено турниров с таким названием</span>}
            {DataTournamentModel && DataTournamentModel.tournaments.map((tournament: TournamentModel, index: number) => {
                return <div key={index}>
                    <Tournament
                        tournament={tournament}
                    />
                </div>
            })}
            <div>
                {pages.map((page: number, index: number) =>
                        <span key={index}
                              className={currentPage == page ? styles.currentPage : styles.page}
                              onClick={() => setCurrentPage(page)}>
{page}
                </span>
                )}
            </div>

        </div>
    )
}
export default Tournaments;