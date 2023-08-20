import React from 'react';
import {useSelector} from "react-redux";
import {rootStateType} from "../../redux/store";
import styles from './AboutUser.module.css'
import image from '../../common/images.png'
import {NavLink} from "react-router-dom";
const AboutUser = () => {
    const userData = useSelector((state: rootStateType) => state.auth.data);
    console.log(userData)
    return (
        <div className={styles.container}>
            {userData && <div>
                <img src={userData?.avatarURL ? `http://localhost:3000${userData.avatarURL}` : image}/>
            {userData.fullName}
            <NavLink to={`/aboutUser/${userData._id}/edit`}>Редактировать</NavLink>
            </div>
            }
        </div>
    );
};

export default AboutUser;