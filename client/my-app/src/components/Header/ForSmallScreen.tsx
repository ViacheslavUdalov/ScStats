import {useSelector} from "react-redux";
import {useNavigate, NavLink} from "react-router-dom";
import {rootStateType, useAppDispatch} from "../../redux/store";
import {logout, selectIsAuth} from "../../redux/authReducer";
import useTheme from "../../helpers/useTheme";
import styles from './ForSmallScreen.module.css';
import {useState} from "react";
import iconUser from "../../common/images.png";
const ForSmallScreen = () => {
    const [active, setActive] = useState(false);
    const dispatch = useAppDispatch();
    const isAuth = useSelector(selectIsAuth);
    const CurrentClient = useSelector((state: rootStateType) => state.auth.data);
    const navigate = useNavigate();
    const Logout = () => {
        if (window.confirm('Вы действительно хотите выйти?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
        }
        navigate('/');
    }
    const {theme, setTheme} = useTheme();
    const handleLight = () => {
        setTheme('light')
    }
    const handleDark = () => {
        setTheme('dark')
    }
    return (
        <div className={styles.flexBox}>
            <div className={styles.burgerBTN} onClick={() => setActive(!active)}>
                <span/>
            </div>
            <div className={active ? styles.menuActive : styles.menu} onClick={() => setActive(false)}>
                <div className={styles.menuContent} onClick={e => e.stopPropagation()}>
                <NavLink className={styles.NavLinks} to={'/'}>Home</NavLink>
                <NavLink className={styles.NavLinks} to={'/tournaments'}>Tournaments</NavLink>
                <NavLink className={styles.NavLinks} to={'/players'}>Users</NavLink>
                    {isAuth && <NavLink className={styles.NavLinks} to={'/add-tournament'}>Create Tournament</NavLink>}
            <div className={styles.rightBox}>
                {isAuth ?
                    <div className={styles.aboutClient}>
                        <div className={styles.imgAndName}>
                    <div className={styles.imageContainer}>
                        <img className={styles.imageAccount}
                             src={CurrentClient?.avatarURL
                                 ? `http://localhost:3000${CurrentClient?.avatarURL}`
                                 : iconUser}/>
                    </div>
                        <NavLink to={`/aboutUser/${CurrentClient?._id}`}
                                 className={styles.currentClient}>{CurrentClient?.fullName}</NavLink>
                        </div>
                    <button className={styles.logout} onClick={Logout}>Выйти</button>
                    </div>
                    :
                    <div className={styles.logres}>
                        <NavLink className={styles.Buttons} to={'/auth/login'}>войти</NavLink>
                        <NavLink className={styles.Buttons} to={'/auth/register'}>зарегистрироваться</NavLink>
                    </div>
                }
                <div className={styles.Themes} onClick={handleDark}>темная</div>
                <div className={styles.Themes} onClick={handleLight}>светлая</div>
            </div>
            </div>
            </div>
        </div>
    )
};
export default ForSmallScreen;