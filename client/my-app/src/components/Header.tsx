import {useAppDispatch} from "../redux/store";
import {logout, selectIsAuth} from "../redux/authReducer";
import {useSelector} from "react-redux";
import {Navigate, NavLink} from "react-router-dom";

const Header = (  ) => {
    const dispatch = useAppDispatch();
   const isAuth = useSelector(selectIsAuth);
    const Logout = () => {
        if (window.confirm('Вы действительно хотите выйти?')) {
            dispatch(logout());
        }
    }

    return (
        <div>
            {isAuth ?
                <button onClick={Logout}>Выйти</button>
                :
                <Navigate to={'/auth/login'} />
            }
        </div>
    )
};
export default Header;