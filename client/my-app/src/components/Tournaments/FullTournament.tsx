import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../redux/store";
import {logout} from "../../redux/authReducer";
import {fetchDeleteTournaments, fetchTournament, fetchTournaments} from "../../redux/TournamentsReducer";
import {useNavigate, useParams} from "react-router-dom";
import instance from "../../api/MainAPI";
import styles from './FullTournament.module.css';

const FullTournament = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const [data, setData] = useState<TournamentModel | undefined>(undefined);
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
        // dispatch(fetchTournament(id))
    }, [])
    const RemoveTournament = () => {
            if (window.confirm('Вы действительно хотите удалить турнир?')) {
                if ( data && data._id != null) {
                    dispatch(fetchDeleteTournaments(data._id))
                    navigate(`/tournaments`);
                }
            }
    }
    console.log(data);
    // console.log(userData);
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
                            <button>редактировать</button>
                        </div>
                    }
                </div>
            </div>
            }

        </div>

    )
}
export default FullTournament;