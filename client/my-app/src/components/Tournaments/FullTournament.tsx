import React, {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import styles from './FullTournament.module.css';
import {useGetFullTournamentQuery} from "../../redux/RTKtournaments";
import {useSelector} from "react-redux";
import {rootStateType} from "../../redux/store";
import instance from "../../api/MainAPI";
import {UserModel} from "../../models/user-model";
import image from '../../common/StormGateLogo_BlackandWhite_Flat.png';
import PreLoader from "../../helpers/isLoading";
import UserIcon from '../../common/images.png'
import {selectIsAuth} from "../../redux/authReducer";

const FullTournament = React.memo(() => {
        const {id} = useParams();
        // @ts-ignore
        const {data: tournament, isLoading, refetch} = useGetFullTournamentQuery(id)
        const userData = useSelector((state: rootStateType) => state.auth.data);
        const isAuth = useSelector(selectIsAuth);
        const navigate = useNavigate();
        const [isParticipating, setParticipating] = useState(false)
        const [isFetching, setIsFetching] = useState(false)
        const [UpdatePlayers, setUpdatePlayers] = useState(tournament?.players)
        const RemoveTournament = async () => {
            if (window.confirm('Вы действительно хотите удалить турнир?')) {
                if (tournament && tournament._id != null) {
                    await instance.delete(`/tournaments/${tournament._id}`);
                    navigate('/tournaments');
                }
            }
        }
        const LeaveFromTournament = async () => {
            if (!tournament) {
                return <PreLoader/>
            }
            if (isParticipating && tournament) {
                setIsFetching(true);
                const updatePlayers = tournament.players.filter((player: UserModel) => player._id !== userData._id)
                const updateTournament = {
                    ...tournament,
                    players: updatePlayers
                }
                const response = await instance.patch(`/tournaments/${tournament._id}`, updateTournament)
                setUpdatePlayers(updatePlayers)
                setParticipating(false)
                setIsFetching(false)
            } else {
                console.log('что-то пошло не так')
            }
        }
        const followForTournament = async () => {
            if (!tournament) {
                return <PreLoader/>
            }
            if (!isParticipating && tournament && !tournament.players.includes(userData)) {
                setIsFetching(true);
                const updatePlayers = [...tournament.players, userData]
                setUpdatePlayers(updatePlayers)
                const updateTournament = {
                    ...tournament,
                    players: updatePlayers
                }
                const response = await instance.patch(`/tournaments/${tournament._id}`, updateTournament)
                // console.log(updateTournament)
                // setUpdatePlayers(updatePlayers)
                setParticipating(true)
                setIsFetching(false);
            } else {
                console.log('вы уже участвуете в этом турнире')
                // setParticipating(true)
            }
        }
        const players = UpdatePlayers ? UpdatePlayers : tournament?.players
        useEffect(() => {
            tournament && tournament.players.map((player: UserModel) => {
                    if (player?._id === userData?._id) {
                        setParticipating(true)
                    }
                }
            )
            refetch()
        }, [players, tournament])
        // console.log(userData)
        // console.log(data);

        const charactersToRemove = ["T", "Z"];
        const modifiedString = tournament?.createdAt
            .replace(new RegExp(`[${charactersToRemove.join('')}]`, 'g'), ' ');
        return (
            <div>
                {isLoading && <PreLoader/>}
                {tournament &&
                    <div className={styles.container}>
                        <div className={styles.MainInfo}>
                            <img className={styles.image}
                                 src={tournament?.imageUrl ? `http://localhost:3000${tournament.imageUrl}`
                                     : image}/>
                            <div className={styles.about}>
                                <h1 className={styles.NameOfTournament}>{tournament?.Name}</h1>
                                <div>
                                    <span style={{fontSize: 'small'}}>О турнире:</span>
                                    <div className={styles.AboutTournament}>{tournament?.about}</div>
                                </div>
                                <span style={{fontSize: 'small'}}>Всего участников: {players?.length}</span>
                                <div className={styles.player}>
                                    {players?.length ?
                                        players?.slice(0, 7).map((player: UserModel, index: number) => {
                                            return <NavLink to={`/AboutUser/${player?._id}`}
                                                            className={styles.PlayerFullName} key={index}>
                                                {player?.fullName}
                                                {index < 6 && index < players.length - 1 && ','}
                                                {index === 6 && tournament.players.length > 7 && '...'}
                                            </NavLink>
                                        }) : <span style={{paddingLeft: '20px'}}>Здесь пока ещё нет учатсников</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            {isAuth || window.localStorage.getItem('token') ?
                                <div>
                                    {isParticipating ?
                                        <div className={styles.LeaveFromTournament}>
                                            {isFetching ? <span>Loading...</span> :
                                                <div className={styles.LeaveFromTournament}>
                                                    <span>Вы участвуете в этом турнире</span>
                                                    <button onClick={LeaveFromTournament}
                                                            className={styles.Buttons}>Покинуть турнир
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                        :
                                        <div> {isFetching ? <span>Loading...</span> :
                                            <button onClick={followForTournament}
                                                    className={styles.Buttons}>Участвовать</button>
                                        }
                                        </div>
                                    }
                                </div> :
                                <span className={styles.ForPlaying}>
                        Зарегистрируйтесь или войдите в аккаунт, что бы участвовать в турнире.
                    </span>
                            }
                            <div>
                                {userData?._id === tournament?.Owner?._id &&
                                    <div className={styles.updateAndDelete}>
                                        <NavLink className={styles.NavLink}
                                                 to={`/tournaments/${id}/edit`}>Редактировать</NavLink>
                                        <button className={styles.RemoveTournament} onClick={RemoveTournament}>Удалить
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={styles.rightMenu}>
                            Создатель турнира:
                            <div className={styles.OwnerAndTime}>
                                <div className={styles.IconContainer}>
                                    <img className={styles.UserIcon}
                                         src={tournament.Owner.avatarURL ?
                                             `http://localhost:3000${tournament.Owner.avatarURL}` : UserIcon}/>
                                </div>
                                <NavLink to={`/aboutUser/${tournament.Owner._id}`}
                                         className={styles.NavLinkName}>{tournament.Owner.fullName}</NavLink>
                            </div>
                            <span className={styles.time}>
                   <span style={{color: "white"}}>Дата создания: </span>{modifiedString?.slice(0, 16)}
                        </span>
                        </div>

                    </div>
                }
            </div>
        )
    }
)
export default FullTournament;