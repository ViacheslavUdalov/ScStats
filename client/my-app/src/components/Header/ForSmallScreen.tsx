import {useSelector} from "react-redux";
import {useNavigate, NavLink} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {logout, selectIsAuth} from "../../redux/authReducer";
import useTheme from "../../helpers/useTheme";
import styles from './ForSmallScreen.module.css';
import {useState} from "react";
const ForSmallScreen = () => {
    const [active, setActive] = useState(false);
    const dispatch = useAppDispatch();
    const isAuth = useSelector(selectIsAuth);
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
                <NavLink className={styles.NavLinks} to={'/players'}>Players</NavLink>
                <NavLink className={styles.NavLinks} to={'/add-tournament'}>Create Tournament</NavLink>
            <div className={styles.rightBox}>
                {isAuth ?
                    <button className={styles.logout} onClick={Logout}>Выйти</button>
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