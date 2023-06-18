import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../redux/store";
import {logout} from "../../redux/authReducer";
import {fetchDeleteTournaments, fetchTournament, fetchTournaments} from "../../redux/TournamentsReducer";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import instance from "../../api/MainAPI";
import styles from './FullTournament.module.css';

const FullTournament = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const [data, setData] = useState<TournamentModel>();
    const userData = useSelector((state: AppStateType) => state.auth.data);
    const navigate = useNavigate();
    useEffect(() => {
        instance.get(`/tournaments/${id}`).then((res) => {
            setData(res.data)
        })
            .catch((err) => {
                console.warn(err);
                alert('Не удалось получить турнир')
            })
    }, [])
    const RemoveTournament = async () => {
            if (window.confirm('Вы действительно хотите удалить турнир?')) {
                if ( data && data._id != null) {
                  await  dispatch(fetchDeleteTournaments(data._id))
                    navigate('/tournaments');
                }
            }
    }
    console.log(data);
    return (
        <div className="App">
            {data &&
            <div>
                <h1>{data.Name}</h1>
                <h3> {data.about}</h3>
                <img className={styles.image} src={data.imageUrl ? `http://localhost:3000${data.imageUrl}`: ""}/>
                {data.players.map((player: any, index: number) => {
                    return  <div key={index}>
                        {player.nickname}
                        {player.race}
                        {player.rank}
                    </div>
                })}
                <div>
                    {userData?._id === data.user?._id &&
                        <div>
                            <button onClick={RemoveTournament}>удалить</button>
                            <NavLink to={`/tournaments/${id}/edit`}>редактировать</NavLink>
                        </div>
                    }
                </div>
            </div>
            }

        </div>

    )
}
export default FullTournament;