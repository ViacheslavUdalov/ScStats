import React, {useEffect, useState} from "react";
import {UserModel} from "../../models/user-model";
import {useGetUsersQuery} from "../../redux/RTKtournaments";
import {NavLink} from "react-router-dom";
import IconUser from '../../common/images.png'
import styles from './Players.module.css';
import OneUser from "./OneUser";
import PreLoader from "../../helpers/isLoading";
const Players = () => {
    const {data, isLoading} = useGetUsersQuery()
    if (isLoading) {
        return <PreLoader />
    }
return <div>
    {data?.users.map((user: UserModel, index: number) => {
        return <div className={styles.AllUsers} key={index}>
            <OneUser user={user} />
        </div>
    })}
</div>
}
export default Players;