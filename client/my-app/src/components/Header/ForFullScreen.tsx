
import {useAppDispatch} from "../../redux/store";
import {logout, selectIsAuth} from "../../redux/authReducer";
import useTheme from "../../helpers/useTheme";
import styles from './ForFullScreen.module.css'
import {useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
const ForFullScreen = () => {

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
    console.log(isAuth)

    return (
        <div className={styles.flexBox}>
                <div className={styles.leftBox}>
                    <NavLink className={styles.NavLinks} to={'/'}>Home</NavLink>
                    <NavLink className={styles.NavLinks} to={'/tournaments'}>Tournaments</NavLink>
                    <NavLink className={styles.NavLinks} to={'/players'}>Players</NavLink>
                    <NavLink className={styles.NavLinks} to={'/add-tournament'}>Create Tournament</NavLink>
                </div>
                <div className={styles.rightBox}>
            {isAuth ?
                <button className={styles.logout} onClick={Logout}>Выйти</button>
                :
                <div>
                <NavLink className={styles.Buttons} to={'/auth/login'}>войти</NavLink>
                <NavLink className={styles.Buttons} to={'/auth/register'}>зарегистрироваться</NavLink>
                </div>
            }
                <div className={styles.Themes} onClick={handleDark}>темная</div>
                <div className={styles.Themes} onClick={handleLight}>светлая</div>
                </div>
        </div>
    )
};
export default ForFullScreen;