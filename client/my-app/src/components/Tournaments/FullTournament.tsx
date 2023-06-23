import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../redux/store";
// import {
//     fetchDeleteTournaments
// } from "../../redux/TournamentsReducer";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import instance from "../../api/MainAPI";
import styles from './FullTournament.module.css';

const FullTournament = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const [data, setData] = useState<TournamentModel>();
    // const userData = useAppSelector((state: AppStateType) => state.auth.data);
    const [Follow, setFollow] = useState(false);
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
    // const RemoveTournament = async () => {
    //     if (window.confirm('Вы действительно хотите удалить турнир?')) {
    //         if (data && data._id != null) {
    //             await dispatch(fetchDeleteTournaments(data._id))
    //             navigate('/tournaments');
    //         }
    //     }
    // }
    // const Join = async () => {
    //     // const players = data?.players.push(userData?._id)
    //     // const fields = {
    //     //     players
    //     // }
    //     await instance.patch(`/tournaments/${id}/players`, userData)
    //     console.log(userData);
    // }
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
                {/*<button onClick={Join}>gogo</button>*/}
                <div>
                    {/*{userData?._id === data?.Owner?._id &&*/}
                        <div>
                            {/*<button onClick={RemoveTournament}>удалить</button>*/}
                            <NavLink to={`/tournaments/${id}/edit`}>редактировать</NavLink>
                        </div>
                    {/*}*/}
                </div>
            </div>
            }
        </div>
    )
}
export default FullTournament;