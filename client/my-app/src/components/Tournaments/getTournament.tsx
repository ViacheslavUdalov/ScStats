import React from "react";
import {TournamentModel} from "../../models/tournament-model";
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch} from "../../redux/store";
import {NavLink, useNavigate} from "react-router-dom";
import styles from './FullTournament.module.css';
type props = {
    tournament: TournamentModel
}
const Tournament = ({tournament}: props) => {
    // const dispatch = useAppDispatch();
    // const userData = useSelector((state: AppStateType) => state.auth.data);
    // const navigate = useNavigate();
    // const RemoveTournament = async () => {
    //     if (window.confirm('Вы действительно хотите удалить турнир?')) {
    //         await dispatch(fetchDeleteTournaments(tournament._id));
    //             navigate('/tournaments');
    //     }
    // }
    // console.log(tournament);
    // console.log(userData);
    return (

            <div className="App">
                <NavLink to={`/tournaments/` + tournament._id}>
                <h1>{tournament.Name}</h1>
        </NavLink>
                <h3> {tournament.about}</h3>
                <img className={styles.image} src={ tournament.imageUrl ? `http://localhost:3000${tournament.imageUrl}` : ""}/>
                {tournament.players.map((player: any, index: number) => {
                    return <div key={index}>
                        {player.nickname}
                        {player.race}
                        {player.rank}
                    </div>
                })}
                <div>
                    {/*{userData?._id === tournament.Owner?._id &&*/}
                        <div>
                            {/*<button onClick={RemoveTournament}>удалить</button>*/}
                            <button>
                                <NavLink to={`/tournaments/${tournament._id}/edit`} >редактировать</NavLink></button>
                        </div>
                    {/*}*/}
                </div>
            </div>

    )
}
export default Tournament;