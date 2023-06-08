import {useAppDispatch} from "../redux/store";
import {logout} from "../redux/authReducer";

const Header = (  ) => {
    const dispatch = useAppDispatch();
    const Logout = () => {
        if (window.confirm('Вы действительно хотите выйти?')) {
            dispatch(logout());
        }
    }
    return (
        <div>
            <button onClick={Logout}>Выйти</button>
        </div>
    )
};
export default Header;