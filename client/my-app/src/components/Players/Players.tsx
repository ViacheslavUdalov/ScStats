import React, {useState} from "react";
import {UserModel} from "../../models/user-model";
import {useGetUsersQuery} from "../../redux/RTKtournaments";
import styles from './Players.module.css';
import PreLoader from "../../helpers/isLoading";
import IconUser from "../../common/images.png";
import {NavLink} from "react-router-dom";
import {useDebounce} from "../../helpers/debounce";
import {createPages} from "../../helpers/Paginator";
import ScrollToTop from "../../helpers/ScrollToTop";

const Players = () => {
    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(100);
    const [pageIndex, setPageIndex] = useState(1);
    const debounce = useDebounce(search);
    const {data, isLoading} = useGetUsersQuery({
        searchTerm: debounce,
        perPage: perPage,
        page: pageIndex
    })
    const totalUsersCount = data?.totalUsersCount;
    const totalPages = totalUsersCount ?  Math.ceil(totalUsersCount / perPage) : 0;
    const pages : Array<number>= [];
    createPages(pages, totalPages, pageIndex);
    return (
        <React.Fragment>
            <PreLoader isLoading={isLoading} />
        <div className={styles.containerForUsers}>
            <div>

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
                    {data?.users.map((user: UserModel, index: number) => {
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