import {NavLink} from "react-router-dom";

const Navigation = () => {
    return <div>
        <NavLink to={'/api/tournaments'}>Tournaments</NavLink>
        <NavLink to={'/api/players'}>Players</NavLink>
    </div>
}
export default Navigation;