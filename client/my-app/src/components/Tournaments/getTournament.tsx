import React, {useEffect, useState} from "react";
import {TournamentModel} from "../../models/tournament-model";
import {useSelector} from "react-redux";
import {rootStateType, useAppDispatch} from "../../redux/store";
import {NavLink} from "react-router-dom";
import styles from './Tournaments.module.css';
import instance from "../../api/MainAPI";
import image from '../../common/StormGateLogo_BlackandWhite_Flat.png';
import {useDeleteTournamentMutation} from "../../redux/RTKtournaments";
import {UserModel} from "../../models/user-model";
import {fetchAuthMe, selectIsAuth} from "../../redux/authReducer";

type props = {
    tournament: TournamentModel
}
const Tournament = ({tournament}: props) => {
    const dispatch = useAppDispatch();
    const userData = useSelector((state: rootStateType) => state.auth.data);
    const [isParticipating, setParticipating] = useState(false)
    const [UpdatePlayers, setUpdatePlayers] = useState(tournament?.players)
    const [isExpanded, setIsExpanded] = useState(false);
    const isAuth = useSelector(selectIsAuth);
    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded)
    }
    const RemoveTournament = async () => {
        if (window.confirm('Вы действительно хотите удалить турнир?')) {
            await instance.delete(`/tournaments/${tournament._id}`);
            window.location.reload();
        }
    }

    // console.log(tournament);
    const followForTournament = async () => {
        if (!isParticipating && tournament) {
            const updatePlayers = [...tournament.players, userData]
            setUpdatePlayers(updatePlayers)
            const updateTournament = {
                ...tournament,
                players: updatePlayers
            }
            const response = await instance.patch(`/tournaments/${tournament._id}`, updateTournament)
            console.log(updateTournament)
            setParticipating(true)
        } else {
            console.log('вы уже участвуете в этом турнире')
            // setParticipating(true)
        }
    }
    useEffect(() => {
        dispatch(fetchAuthMe)
    }, [])
    useEffect(() => {
        tournament && tournament.players.map((player: UserModel) => {
                if (player?._id === userData?._id) {
                    setParticipating(true)
                }
            }
        )
    }, [tournament])
    const players = UpdatePlayers ? UpdatePlayers : tournament?.players
    console.log(userData);
    return (
        <div className={styles.mainContainer}>
            <div className={styles.imgAndName}>
                <img className={styles.image}
                     src={tournament.imageUrl ?
                         `http://localhost:3000${tournament.imageUrl}` : image}/>
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
                                <span>{tournament.about.slice(0, 40)}...</span>
                        }
                        {tournament.about.length >= 40 &&
                            <button className={styles.hideAndShow} onClick={toggleIsExpanded}>{isExpanded ? 'скрыть' : 'Показать'}</button>
                        }
                        </div>
                    <div style={{marginTop: '15px', fontSize: 'small', }}>
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
                        <NavLink className={styles.Participant} to={`/AboutUser/${player._id}`}>{player.fullName}</NavLink>
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
                        <button onClick={followForTournament} className={styles.Joinbutton}>Join</button>
                } </div>
                :
                    <span className ={styles.ForPlaying}>Зарегистрируйтесь или войдите в аккаунт, что бы участвовать в турнире.</span>}


            </div>
            {userData?._id === tournament.Owner?._id &&
                <span className={styles.YouAreCreator}>Вы создатель этого турнира!</span>
            }
            {/*<div>*/}
            {/*    {userData?._id === tournament.Owner?._id &&*/}
            {/*        <div className={styles.rightButtons}>*/}
            {/*            <button onClick={RemoveTournament} className={styles.Buttons}>удалить</button>*/}
            {/*            <NavLink to={`/tournaments/${tournament._id}/edit`} className={styles.Buttons}>*/}
            {/*                редактировать</NavLink>*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*</div>*/}
        </div>

    )
}
export default Tournament;