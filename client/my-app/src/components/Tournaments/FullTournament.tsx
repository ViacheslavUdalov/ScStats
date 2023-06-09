import React from "react";
import {NavLink, useParams} from "react-router-dom";
import styles from './FullTournament.module.css';
import {useGetFullTournamentQuery} from "../../redux/RTKtournaments";

const FullTournament = () => {
    const {id} = useParams();
    // @ts-ignore
    const {data, isLoading} = useGetFullTournamentQuery(id)
    // const RemoveTournament = async () => {
    //     if (window.confirm('Вы действительно хотите удалить турнир?')) {
    //         if (data && data._id != null) {
    //             await dispatch(fetchDeleteTournaments(data._id))
    //             navigate('/tournaments');
    //         }
    //     }
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