import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import Tournament from "./getTournament";
import {useGetAllTournamentsQuery} from "../../redux/RTKtournaments";
import {useDebounce} from "../../helpers/debounce";
import PreLoader from "../../helpers/isLoading";
import {createPages} from "../../helpers/Paginator";
import styles from './Tournaments.module.css';
import ScrollToTop from "../../helpers/ScrollToTop";

const Tournaments = React.memo(() => {
        const [searchTerm, setSearchTerm] = useState('');
        const [currentPage, setCurrentPage] = useState(1);
        const [perPage, setPerPage] = useState(10);
        const debounce = useDebounce(searchTerm);
        const {data: DataTournamentModel, error, isLoading, refetch} =
            useGetAllTournamentsQuery({
                searchTerm: debounce,
                page: currentPage,
                perPage: perPage
            });
        useEffect(() => {
            refetch()
        }, [DataTournamentModel])
        const totalCount = DataTournamentModel?.totalCount
        const pagesCount = totalCount ? Math.ceil(totalCount / perPage) : 0;
        const pages: Array<number> = [];
        createPages(pages, pagesCount, currentPage)
        console.log(DataTournamentModel);
        if (isLoading) {
            return <PreLoader/>
        }


        return (
            <div className={styles.mainPage}>
                <input type={'search'}
                       className={styles.searchInput}
                       value={searchTerm}
                       placeholder={'Введите название турнира'}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className={styles.mainPageContainer}>

                    {DataTournamentModel && DataTournamentModel.tournaments.length == 0 &&
                        <span>Не найдено турниров</span>}
                    {DataTournamentModel &&
                        DataTournamentModel.tournaments.map((tournament: TournamentModel, index: number) => {
                            return <div key={index}>
                                <Tournament
                                    tournament={tournament}
                                />
                            </div>
                        })}
                    <div className={styles.pagination}>
                        {pages.map((page: number, index: number) =>
                                <span key={index}
                                      className={currentPage == page ? styles.currentPage : styles.page}
                                      onClick={() => setCurrentPage(page)}>
{page}
                </span>
                        )}
                    </div>
                </div>
                <ScrollToTop/>
            </div>
        )
    }
)
export default Tournaments;