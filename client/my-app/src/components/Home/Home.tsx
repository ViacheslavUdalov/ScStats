import IsLoading from "../../helpers/isLoading";
import {TournamentModel} from "../../models/tournament-model";
import {useAppDispatch} from "../../redux/store";
import {useGetAllTournamentsQuery} from "../../redux/RTKtournaments";
import styles from './home.module.css'
import {NavLink} from "react-router-dom";
import React from "react";
import image from '../../common/4151292-1.jpg';
const Home = React.memo(() => {
    const dispatch = useAppDispatch();
    // const {tournaments} = useSelector((state: rootStateType) => state.tournaments);
    const {data, isLoading} = useGetAllTournamentsQuery({
        page: 1,
        searchTerm: '',
        perPage: 10
    });
    if (isLoading) {
        return <IsLoading/>
    }
    ;
    console.log(data)
    return (
        <div className={styles.global}>
            <div className={styles.container}>
                {/*<img src={image} className={styles.imageCSS}/>*/}

                <div className={styles.main}>
                    <h2 style={{paddingLeft: '20px', textDecoration: 'underline white'}}>Предстоящие турниры:</h2>
                    {data && data.tournaments.slice(0, 5).map((obj: TournamentModel, index: number) => {
                        const charactersToRemove = ["T", "Z"];
                        const modifiedString = obj.createdAt.replace(new RegExp(`[${charactersToRemove.join('')}]`, 'g'), ' ');
                        return <div className={styles.oneTournament} key={index}>
                            <div style={{display: 'flex'}}>
                                <img src={obj?.imageUrl ? `http://localhost:3000${obj.imageUrl}` : image}
                                     className={styles.TournamentImage}/>
                                <NavLink to={`/tournaments/` + obj?._id}
                                         className={styles.Participant}> {obj?.Name}</NavLink>
                            </div>
                            {obj.about.length > 23 && <span>{obj?.about.slice(0, 30)}...</span>}
                            <span className={styles.fullName}><span
                                style={{fontSize: 'small'}}>Создатель турнира:</span> {obj.Owner?.fullName}</span>
                            <span style={{
                                fontSize: 'small',
                                color: "yellow"
                            }}>Турнир создан: {modifiedString.slice(0, 16)}</span>
                        </div>
                    })}
                </div>

            </div>
            <div>
            </div>
            {/*<div className={styles.TwoCars}>*/}
            {/*    <img src={ImbaCar} className={styles.ImbaCar}/>*/}
            {/*    <img src={ImbaCar2} className={styles.ImbaCar}/>*/}
            {/*</div>*/}
        </div>
    )
}
)
export default Home;