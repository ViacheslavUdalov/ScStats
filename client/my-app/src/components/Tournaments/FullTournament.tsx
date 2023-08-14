import React from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import styles from './FullTournament.module.css';
import {useDeleteTournamentMutation, useGetFullTournamentQuery} from "../../redux/RTKtournaments";
import {useSelector} from "react-redux";
import {rootStateType} from "../../redux/store";
import instance from "../../api/MainAPI";

const FullTournament = () => {
    const {id} = useParams();
    // @ts-ignore
    const {data, isLoading} = useGetFullTournamentQuery(id)
    const [deleteTournament, {error, isLoading: isFetching}] = useDeleteTournamentMutation();
    const userData = useSelector((state: rootStateType) => state.auth.data);
    const navigate = useNavigate();
    const RemoveTournament = async () => {
        if (window.confirm('Вы действительно хотите удалить турнир?')) {
            if (data && data._id != null) {
                await instance.delete(`/tournaments/${data._id}`);
                navigate('/tournaments');
            }
        }
    }
    console.log(data);
    return (
        <div >
            {data &&
            <div className={styles.container}>
                <div className={styles.MainInfo}>
                    <img className={styles.image}
                         src={data.imageUrl ? `http://localhost:3000${data.imageUrl}`
                             : ""}/>
                    <div className={styles.about}>
                <h1>{data.Name}</h1>
                <h3> {data.about}</h3>
                    </div>
                </div>

                {data.players.map((player: any, index: number) => {
                    return  <div key={index}>
                        {player.nickname}
                        {player.race}
                        {player.rank}
                    </div>
                })}

                <div>
                    {userData?._id === data?.Owner?._id &&
                        <div>
                            <NavLink className={styles.NavLink} to={`/tournaments/${id}/edit`}>редактировать</NavLink>
                            <button className={styles.RemoveTournament} onClick={RemoveTournament}>удалить</button>
                        </div>
                    }
                </div>
            </div>
            }
        </div>
    )
}
export default FullTournament;