import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {rootStateType} from "../../redux/store";
import styles from './AboutUser.module.css'
import image from '../../common/images.png'
import {NavLink, useParams} from "react-router-dom";
import {useGetOneUserQuery} from "../../redux/RTKtournaments";
import PreLoader from "../../helpers/isLoading";
const AboutUser = () => {
    const {id} = useParams()
    const CurrentClient = useSelector((state: rootStateType) => state.auth.data);
   // @ts-ignore
    const {data: UserData, isLoading, refetch} = useGetOneUserQuery(id)
    console.log(UserData)
    useEffect(() => {
        refetch()
    }, [UserData])
    if (isLoading) {
        return <PreLoader />
    }
    return (
        <div className={styles.container}>
            {UserData && <div>
                <div className={styles.topPageInfo}>
                    <div className={styles.imageContainer}>
                        <img src={UserData?.avatarURL ? `http://localhost:3000${UserData?.avatarURL}` : image} className={styles.UserIcon}/>
                    </div>

                    <span>НикНейм:<h2>{UserData.fullName}</h2></span>
                    <span> Рейтинг:<h2>{UserData.rank}</h2></span>
                    <span>Почта пользователя:<h5>{UserData.email}</h5></span>
                    <span>Старана:<h5>{UserData.country}</h5></span>
                </div>

                {UserData?._id === CurrentClient?._id &&
                    <NavLink to={`/aboutUser/${UserData._id}/edit`} className={styles.NavLinkName}>Редактировать</NavLink>}

            </div>
            }
        </div>
    );
};

export default AboutUser;