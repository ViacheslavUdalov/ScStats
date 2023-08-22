import React from 'react';
import {UserModel} from "../../models/user-model";
import styles from "./Players.module.css";
import IconUser from "../../common/images.png";
import {NavLink} from "react-router-dom";
import {TournamentModel} from "../../models/tournament-model";

type props = {
    user: UserModel
}
const OneUser = ({user}: props) => {
    const charactersToRemove = ["T", "Z"];
    const modifiedString = user?.createdAt.replace(new RegExp(`[${charactersToRemove.join('')}]`, 'g'), ' ');
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={user.avatarURL ?
                        `http://localhost:3000${user.avatarURL}` :
                        IconUser}/>
                </div>
                <NavLink className={styles.fullName} to={`/aboutUser/${user._id}`}>{user.fullName}</NavLink>
                <span className={styles.CreateData}>Аккаунт был создан: {modifiedString?.slice(0, 11)}</span>
            </div>
        </div>
    );
};

export default OneUser;