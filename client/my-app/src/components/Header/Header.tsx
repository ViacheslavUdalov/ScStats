import {useSelector} from "react-redux";
import {useNavigate, NavLink} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {logout, selectIsAuth} from "../../redux/authReducer";
import useTheme from "../../helpers/useTheme";

const Header = (  ) => {
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
        <div>
            {isAuth ?
                <button onClick={Logout}>Выйти</button>
            :
                <div>
            <NavLink to={'/auth/login'}><button>войти</button></NavLink>
            <NavLink to={'/auth/register'}><button>зарегистрироваться</button></NavLink>
                </div>
            }
            <button onClick={handleDark}>темная</button>
            <button onClick={handleLight}>светлая</button>
        </div>
    )
};
export default Header;