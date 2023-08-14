import IsLoading from "../../helpers/isLoading";
import {TournamentModel} from "../../models/tournament-model";
import {useAppDispatch} from "../../redux/store";
import {useGetAllTournamentsQuery} from "../../redux/RTKtournaments";
import styles from './home.module.css'
import {NavLink} from "react-router-dom";
import React from "react";
const Home = () => {
    const dispatch = useAppDispatch();
    // const {tournaments} = useSelector((state: rootStateType) => state.tournaments);
    const {data, isLoading} = useGetAllTournamentsQuery({
        page: 1,
    searchTerm: '',
        perPage: 10
    });
    if(isLoading ) {
        return <IsLoading />
    };
    console.log(data)
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                {data &&  data.tournaments.map((obj: TournamentModel, index: number) => {
                    return <div className={styles.oneTournament} key={index}>
                       <NavLink to={`/tournaments/` + obj._id}> {obj.Name}</NavLink>
                        <span>{obj.about}</span>
                        <span className={styles.fullName}> {obj.Owner?.fullName}</span>
                        {/*{obj.players.map((player: any, index ) => {*/}
                        {/*    return <div key={index}>*/}
                        {/*        {player.rank}*/}
                        {/*        {player.nickname}*/}
                        {/*    </div>*/}
                        {/*})} */}
                    </div>
                })}
            </div>
        </div>
    )
};
export default Home;