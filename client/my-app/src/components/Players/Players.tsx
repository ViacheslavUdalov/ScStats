import React from "react";
import {UserModel} from "../../models/user-model";
import {useGetUsersQuery} from "../../redux/RTKtournaments";
import styles from './Players.module.css';
import PreLoader from "../../helpers/isLoading";
import IconUser from "../../common/images.png";
import {NavLink} from "react-router-dom";

const Players = () => {
    const {data, isLoading} = useGetUsersQuery()
    if (isLoading) {
        return <PreLoader/>
    }
    return (
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

            </div>
        </div>

    )
}
export default Players;