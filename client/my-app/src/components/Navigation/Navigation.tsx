import {NavLink} from "react-router-dom";

const Navigation = () => {
    return <div>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/tournaments'}>Tournaments</NavLink>
        <NavLink to={'/players'}>Players</NavLink>
        <NavLink to={'/add-tournament'}>Create Tournament</NavLink>
    </div>
}
export default Navigation;