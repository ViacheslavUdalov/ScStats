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
import {useLocation} from 'react-router-dom';

const Tournaments = React.memo(() => {
        const location = useLocation();
        const queryParams = new URLSearchParams(location.search);
        const [searchTerm, setSearchTerm] = useState(queryParams.get('searchTerm') || '');
        const [page, setCurrentPage] = useState(1);
        const [perPage, setPerPage] = useState(10);
        const dispatch = useAppDispatch()
        const debounce = useDebounce(searchTerm);
        const {tournaments, isLoading} = useAppSelector((state) => state.tournaments);
        const getComponentState = () => {
            const term = queryParams.get('searchTerm') || '';
            const currentPage = parseInt(queryParams.get('page') || '1');
            const perPageValue = parseInt(queryParams.get('perPage') || '10');
        }
        useEffect(() => {
            getComponentState()
            updateUrl(queryParams.toString());
        }, [])

        useEffect(() => {
            dispatch(fetchTournaments({searchTerm, page, perPage}))
        }, [debounce, page, location.search]);
        const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value.trim());
            queryParams.set('searchTerm', event.target.value);
            queryParams.set('pageIndex', page.toString());
            queryParams.set('perPage', perPage.toString());
            updateUrl(queryParams.toString());
        }
        const handleCurrentPageChange = (pageIndex: number) => {
            setCurrentPage(pageIndex);
            queryParams.set('searchTerm', searchTerm);
            queryParams.set('pageIndex', pageIndex.toString());
            queryParams.set('perPage', perPage.toString());
            updateUrl(queryParams.toString());
        }

        const updateUrl = (queryString: string) => {
            const newUrl = `${window.location.pathname}?${queryString}`
            window.history.replaceState({}, '', newUrl);
        }
        const totalCount = tournaments?.totalCount
        const pagesCount = totalCount ? Math.ceil(totalCount / perPage) : 0;
        const pages: Array<number> = [];
        createPages(pages, pagesCount, page)


        return (
            <React.Fragment>
                <PreLoader isLoading={isLoading}/>
                <div className={styles.mainPage}>
                    <input type={'search'}
                           className={styles.searchInput}
                           value={searchTerm}
                           placeholder={'Введите название турнира'}
                           onChange={handleSearchTermChange}
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
                                          onClick={() => handleCurrentPageChange(page)}>
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