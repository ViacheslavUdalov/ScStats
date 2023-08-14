import React, {useEffect} from "react";
import {TournamentModel} from "../../models/tournament-model";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType, useAppDispatch, useAppSelector} from "../../redux/store";
import {NavLink, useNavigate} from "react-router-dom";
import styles from './Tournaments.module.css';
import instance from "../../api/MainAPI";
import image from '../../common/maxresdefault.jpg'
import {PlayersModel} from "../../models/Players-model";
import {useDeleteTournamentMutation} from "../../redux/RTKtournaments";

type props = {
    tournament: TournamentModel
}
const Tournament = ({tournament}: props) => {
    const [deleteTournament] = useDeleteTournamentMutation()
    // const dispatch = useAppDispatch();
    const userData = useSelector((state: rootStateType) => state.auth.data);
    const navigate = useNavigate();
    const RemoveTournament = async () => {
        if (window.confirm('Вы действительно хотите удалить турнир?')) {
            await instance.delete(`/tournaments/${tournament._id}`);
            window.location.reload();
        }
    }
    // console.log(tournament);
    const followForTournament = async () => {
        if (tournament.players.find((player: PlayersModel) => player.fullName === userData.fullName)) {
            const users = [...tournament.players,  userData]
            const response = await instance.patch(`/tournaments/${tournament._id}`, {players: users})
        }
    }
    // console.log(userData);
    return (
        <div className={styles.mainContainer}> 
            <div className={styles.imgAndName}>
            <img className={styles.image}
                 src={tournament.imageUrl ?
                     `http://localhost:3000${tournament.imageUrl}` : image}/>
                <div className={styles.NameAndAbout}>
                <h3>
                    <NavLink to={`/tournaments/` + tournament._id} className={styles.NavLinkName}>
                        {tournament.Name}
                    </NavLink>
                </h3>
                <h4> {tournament.about}</h4>
                </div>
                {tournament.players.map((player: any, index: number) => {
                    return <div key={index}>
                        {player.nickname}
                        {player.race}
                        {player.rank}
                    </div>
                })}
                <button onClick={followForTournament}>участвовать</button>
            </div>
            <div>
                {userData?._id === tournament.Owner?._id &&
                    <div className={styles.rightButtons}>
                        <button onClick={RemoveTournament} className={styles.Buttons}>удалить</button>
                        <NavLink to={`/tournaments/${tournament._id}/edit`} className={styles.Buttons}>
                            редактировать</NavLink>
                    </div>
                }
            </div>
        </div>

    )
}
export default Tournament;