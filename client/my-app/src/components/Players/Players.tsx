import React, {useEffect, useState} from "react";
import {UserModel} from "../../models/user-model";
import {useGetUsersQuery} from "../../redux/RTKtournaments";
import styles from './Players.module.css';
import PreLoader from "../../helpers/isLoading";
import IconUser from "../../common/images.png";
import {NavLink} from "react-router-dom";
import {useDebounce} from "../../helpers/debounce";
import {createPages} from "../../helpers/Paginator";
import ScrollToTop from "../../helpers/ScrollToTop";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchAllUsers} from "../../redux/UsersReducer";

const Players = () => {
    const dispatch = useAppDispatch();
    const [searchTerm, setSearch] = useState('');
    const [perPage, setPerPage] = useState(100);
    const [pageIndex, setPageIndex] = useState(1);
    const debounce = useDebounce(searchTerm);

    const {users, isLoading} = useAppSelector(state => state.users);
    console.log(users);


    useEffect(() => {
        dispatch(fetchAllUsers({ searchTerm, pageIndex, perPage}))
    }, [debounce, pageIndex])


    const totalUsersCount = users?.totalUsersCount;
    const totalPages = totalUsersCount ?  Math.ceil(totalUsersCount / perPage) : 0;
    const pages : Array<number>= [];
    createPages(pages, totalPages, pageIndex);


    return (
        <React.Fragment>
            <PreLoader isLoading={isLoading} />
        <div className={styles.containerForUsers}>
            <div>
                <input type={'search'}
                       onChange={((event) => setSearch(event.target.value))}
                       value={searchTerm}
                       placeholder={'Введите ник нейм игрока'}
                       className={styles.searchInput}
                />
                <table className={styles.AllUsers}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Avatar</th>
                        <th>Nickname</th>
                        <th>Country</th>
                        <th>Rank</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.users?.map((user: UserModel, index: number) => {
                        return <tr key={index}
                                   className={styles.containerForOneUser}>
                            <td>{index + 1}.</td>
                            <td>
                                <div className={styles.imageContainer}>
                                    <img className={styles.image}alt={'image'} src={user.avatarURL ?
                                        `http://localhost:3000${user.avatarURL}` :
                                        IconUser}/>
                                </div>
                            </td>
                            <td><NavLink className={styles.fullName}
                                         to={`/aboutUser/${user._id}`}>{user.fullName}</NavLink></td>
                            <td>{user.country}</td>
                            <td>{user.rank}</td>
                        </tr>
                    })}
                    </tbody>

                </table>
                <div className={styles.pagination}>
                    {pages.map((page, index) => {
                        return <span key={index}
                                     className={pageIndex == page ? styles.currentPage : styles.page}
                                     onClick={() => setPageIndex(page)}
                        >{page}</span>
                    })}
                </div>
            </div>
            <ScrollToTop/>
        </div>
        </React.Fragment>
    )
}
export default Players;