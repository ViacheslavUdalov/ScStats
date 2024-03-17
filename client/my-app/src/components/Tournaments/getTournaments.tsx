import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import Tournament from "./getTournament";
import {useDebounce} from "../../helpers/debounce";
import PreLoader from "../../helpers/isLoading";
import {createPages} from "../../helpers/Paginator";
import styles from './Tournaments.module.css';
import ScrollToTop from "../../helpers/ScrollToTop";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchTournaments} from "../../redux/TournamentsReducer";

const Tournaments = React.memo(() => {
        const [searchTerm, setSearchTerm] = useState('');
        const [page, setCurrentPage] = useState(1);
        const [perPage, setPerPage] = useState(10);
        const dispatch = useAppDispatch()
        const debounce = useDebounce(searchTerm);
    const { tournaments, isLoading } = useAppSelector((state) => state.tournaments);
    console.log(tournaments);
        useEffect(() => {
            dispatch(fetchTournaments({searchTerm, page, perPage}))
        }, [debounce, page])
        const totalCount = tournaments?.totalCount
        const pagesCount = totalCount ? Math.ceil(totalCount / perPage) : 0;
        const pages: Array<number> = [];
        createPages(pages, pagesCount, page)
        // console.log(DataTournamentModel);
        return (
            <React.Fragment>
                <PreLoader isLoading={isLoading} />
            <div className={styles.mainPage}>
                <input type={'search'}
                       className={styles.searchInput}
                       value={searchTerm}
                       placeholder={'Введите название турнира'}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className={styles.mainPageContainer}>

                    {tournaments && tournaments.tournaments?.length === 0 &&
                        <span>Не найдено турниров</span>}
                    {tournaments?.tournaments &&
                        tournaments.tournaments.map((tournament: TournamentModel, index: number) => {
                            return <div key={index}>
                                <Tournament
                                    tournament={tournament}
                                />
                            </div>
                        })}
                    <div className={styles.pagination}>
                        {pages.map((page: number, index: number) =>
                                <span key={index}
                                      className={page == page ? styles.currentPage : styles.page}
                                      onClick={() => setCurrentPage(page)}>
{page}
                </span>
                        )}
                    </div>
                </div>
                <ScrollToTop/>
            </div>
                </React.Fragment>
        )
    }
)
export default Tournaments;