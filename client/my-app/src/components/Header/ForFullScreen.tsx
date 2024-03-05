import iconUser from '../../common/images.png';
import {rootStateType, useAppDispatch} from "../../redux/store";
import {logout, selectIsAuth} from "../../redux/authReducer";
import useTheme from "../../helpers/useTheme";
import styles from './ForFullScreen.module.css'
import {useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Modal from "../../helpers/Modal";
const ForFullScreen = () => {
    const CurrentClient = useSelector((state: rootStateType) => state.auth.data);
    const dispatch = useAppDispatch();
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const Logout = () => {
                dispatch(logout());
            window.localStorage.removeItem('currentUser');
        window.localStorage.removeItem('token');
        setModalIsOpen(false);
        navigate('/');
    }
    const {theme, setTheme} = useTheme();
    const handleLight = () => {
        setTheme('light')
    }
    const handleDark = () => {
        setTheme('dark')
    }
    console.log(isAuth)

    return (
        <div className={styles.flexBox}>
                <div className={styles.leftBox}>
                    <NavLink className={({isActive}) => isActive ? styles.active : styles.NavLinks} to={'/'}>Home</NavLink>
                    <NavLink className={({isActive}) => isActive ? styles.active : styles.NavLinks} to={'/tournaments'}>Tournaments</NavLink>
                    <NavLink className={({isActive}) => isActive ? styles.active : styles.NavLinks} to={'/players'}>Users</NavLink>
                    {isAuth && <NavLink className={({isActive}) => isActive ? styles.active : styles.NavLinks} to={'/add-tournament'}>Create Tournament</NavLink>}
                </div>
                <div className={styles.rightBox}>
            {isAuth || window.localStorage.getItem('token') ?
                <div className={styles.account}>
                    <div className={styles.imageContainer}>
                    <img className={styles.imageAccount}
                         src={CurrentClient?.avatarURL
                             ? `http://localhost:3000${CurrentClient?.avatarURL}`
                             : iconUser}/>
                    </div>
                <NavLink to={`/aboutUser/${CurrentClient?._id}`}
                         className={styles.currentClient}>{CurrentClient?.fullName}</NavLink>
                <button className={styles.logout} onClick={() => setModalIsOpen(true)}>Выйти</button>
                </div>
                :
                <div>
                <NavLink className={styles.Buttons} to={'/auth/login'}>войти</NavLink>
                <NavLink className={styles.Buttons} to={'/auth/register'}>зарегистрироваться</NavLink>
                </div>
            }
                <div className={styles.Themes} onClick={handleDark}>темная</div>
                <div className={styles.Themes} onClick={handleLight}>светлая</div>
                </div>
            <Modal isOpen={modalIsOpen} onClose={closeModal}>
                <div className={styles.inSideModal}>
               <span className={styles.LogoutFromAcc}>Вы уверены что вы хотите выйти из аккаунта?</span>
                <button onClick={Logout} className={styles.ModalButton}>Выйти из аккаунта</button>
                </div>
            </Modal>
        </div>
    )
};
export default ForFullScreen;