import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import {useSelector} from "react-redux";
import {rootStateType, useAppDispatch} from "../../redux/store";
import {NavLink} from "react-router-dom";
import styles from './Tournaments.module.css';
import image from '../../common/StormGateLogo_BlackandWhite_Flat.png';
import {UserModel} from "../../models/user-model";
import {fetchAuthMe, selectIsAuth} from "../../redux/authReducer";
import {
    fetchTournament,
    followTournament,
    setIsParticipatingFalse,
    setIsParticipatingTrue, updateTournamentData
} from "../../redux/TournamentReducer";

type props = {
    tournament: TournamentModel
}
const Tournament = React.memo(({tournament}: props) => {

        const dispatch = useAppDispatch();

     const isAuth = useSelector(selectIsAuth);
        const userData: UserModel = useSelector((state: rootStateType) => state.auth.data);

        const [players, setPlayers] = useState(tournament.players);
        const [isParticipating, setIsParticipating] = useState(false);
        const [isExpanded, setIsExpanded] = useState(false);

        useEffect(() => {
            if (players.some((player) => player._id === userData._id)) {
                setIsParticipating(true)
            }

        }, [tournament])


        const toggleIsExpanded = () => {
            setIsExpanded(!isExpanded)
        }
        const followForTournament = async (id: string) => {
            try {

                let tournamentData = await dispatch(fetchTournament({id: id, currentClientId: userData._id}));
                let tournament = tournamentData.payload;
                const updatedTournamentData = await dispatch(followTournament({
                    localTournament: tournament,
                    currentClient: userData
                }))
                const updatedTournament = updatedTournamentData.payload;
                console.log(updatedTournament);
                setIsParticipating(true);
                setPlayers(prevState => [...prevState, userData])
            } catch (err) {
                console.log(err);
            }
        }

        return (
            <div className={styles.mainContainer}>
                <div className={styles.imgAndName}>
                    <img className={styles.image}
                         src={tournament.imageUrl ?
                             `http://localhost:3000${tournament.imageUrl}` : image} alt={'image'}/>
                    <div className={styles.NameAndAbout}>
                        <h2>
                            <NavLink to={`/tournaments/` + tournament._id} className={styles.NavLinkName}>
                                {tournament.Name}
                            </NavLink>
                        </h2>
                        <div className={styles.About}>
                    <span style={{opacity: "70%", paddingRight: '7px'}}>
                        О Турнире:
                    </span>
                            <div>
                                {isExpanded ?
                                    <span className={styles.AboutTournament}>
                        {tournament.about}
                </span>
                                    :
                                    <span>{tournament.about.slice(0, 40)}</span>
                                }
                                {tournament.about.length >= 40 &&
                                    <button className={styles.hideAndShow}
                                            onClick={toggleIsExpanded}>{isExpanded ? 'скрыть' : 'Показать'}</button>
                                }
                            </div>
                            <div style={{marginTop: '15px', fontSize: 'small',}}>
                                Создатель турнира:
                                <NavLink className={styles.TournamentCreator} to={`/AboutUser/${tournament.Owner._id}`}>
                                    {tournament.Owner?.fullName}
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className={styles.players}>
                        <span>Всего участников: {players.length}</span>
                        {players.slice(0, 5).map((player: UserModel, index: number) => {
                            return <div key={index}>
                                <NavLink className={styles.Participant}
                                         to={`/AboutUser/${player._id}`}>{player.fullName}</NavLink>
                                {index < 4 && index < players.length - 1 && ','}
                                {index === 4 && players.length - 1 > 4 && '...'}
                            </div>
                        })}
                    </div>
                    {isAuth || window.localStorage.getItem('token') ?
                        <div>
                            {
                                isParticipating ? <span className={styles.YouArePlaying}>Вы участвуете в этом турнире</span>
                                    :
                                    <button onClick={() => followForTournament(tournament._id)}
                                            className={styles.Joinbutton}>Join</button>
                            } </div>
                        :
                        <span className={styles.ForPlaying}>
                        Зарегистрируйтесь или войдите в аккаунт, что бы участвовать в турнире.
                    </span>}

                </div>
                {userData?._id === tournament.Owner?._id &&
                    <span className={styles.YouAreCreator}>Вы создатель этого турнира!</span>
                }
            </div>

        )
    }
)
export default Tournament;