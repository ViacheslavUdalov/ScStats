import React from "react";
import {TournamentModel} from "../../models/tournament-model";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../redux/store";
import {logout} from "../../redux/authReducer";
import {fetchDeleteTournaments} from "../../redux/TournamentsReducer";
import {NavLink, useNavigate} from "react-router-dom";

type props = {
    tournament: TournamentModel
}
const Tournament = ({tournament}: props) => {
    const dispatch = useAppDispatch();
    const userData = useSelector((state: AppStateType) => state.auth.data);
    // const id = tournament._id
    const navigate = useNavigate();
    const RemoveTournament = () => {
        if (window.confirm('Вы действительно хотите удалить турнир?')) {
            if (tournament._id != null) {
                dispatch(fetchDeleteTournaments(tournament._id))
            }
            navigate(`/tournaments`);
        }
    }
    console.log(tournament);
    // console.log(userData);
    return (
        <NavLink to={`/tournaments/` + tournament._id}>
            <div className="App">
                <h1>{tournament.Name}</h1>
                <h3> {tournament.about}</h3>
                <img src={ tournament.imageUrl ? `http://localhost:3000${tournament.imageUrl}` : ""}/>
                {tournament.players.map((player: any, index: number) => {
                    return <div key={index}>
                        {player.nickname}
                        {player.race}
                        {player.rank}
                    </div>
                })}
                <div>
                    {userData?._id === tournament.user?._id &&
                        <div>
                            <button onClick={RemoveTournament}>удалить</button>
                            <button>редактировать</button>
                        </div>
                    }
                </div>
            </div>
        </NavLink>
    )
}
export default Tournament;