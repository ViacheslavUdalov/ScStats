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

const FullTournament = () => {
    const {id} = useParams();
    // @ts-ignore
    const {data, isLoading, refetch} = useGetFullTournamentQuery(id)
    const userData = useSelector((state: rootStateType) => state.auth.data);
    const navigate = useNavigate();
    const [isParticipating, setParticipating] = useState(false)
    const [UpdatePlayers, setUpdatePlayers] = useState(data?.players)
    const RemoveTournament = async () => {
        if (window.confirm('Вы действительно хотите удалить турнир?')) {
            if (data && data._id != null) {
                await instance.delete(`/tournaments/${data._id}`);
                navigate('/tournaments');
            }
        }
    }
    const LeaveFromTournament = async () => {
        if (isParticipating && data) {
            const updatePlayers = data.players.filter((player: UserModel) => player._id !== userData._id)
            setUpdatePlayers(updatePlayers)
            const updateTournament = {
                ...data,
                players: updatePlayers
            }
            const response = await instance.patch(`/tournaments/${data._id}`, updateTournament)
            setParticipating(false)
        }
        else {
            console.log('что-то пошло не так')
        }
    }
    const followForTournament = async () => {
        if (!isParticipating && data) {
            const updatePlayers = [...data.players, userData]
            setUpdatePlayers(updatePlayers)
            const updateTournament = {
                ...data,
                players: updatePlayers
            }
            const response = await instance.patch(`/tournaments/${data._id}`, updateTournament)
            // console.log(updateTournament)
            setParticipating(true)
        } else {
            console.log('вы уже участвуете в этом турнире')
            // setParticipating(true)
        }
    }
    const players = UpdatePlayers ? UpdatePlayers : data?.players
    useEffect(() => {
        data && data.players.map((player: UserModel) => {
                if (player._id === userData._id) {
                    setParticipating(true)
                }
            }
        )
    }, [players, data])
    // console.log(userData)
    // console.log(data);

    const charactersToRemove = ["T", "Z"];
    const modifiedString = data?.createdAt.replace(new RegExp(`[${charactersToRemove.join('')}]`, 'g'), ' ');
    return (
        <div>
            {isLoading && <PreLoader/>}
            {data &&
                <div className={styles.container}>
                    <div className={styles.MainInfo}>
                        <img className={styles.image}
                             src={data.imageUrl ? `http://localhost:3000${data.imageUrl}`
                                 : image}/>
                        <div className={styles.about}>
                            <h1 className={styles.NameOfTournament}>{data.Name}</h1>
                            <div>
                                <span style={{fontSize: 'small'}}>О турнире:</span>
                                <div className={styles.AboutTournament}>{data.about}</div>
                            </div>
                            <span style={{fontSize: 'small'}}>Всего участников: {players?.length}</span>
                            <div className={styles.player}>
                                {players?.length ?
                                    players?.slice(0, 7).map((player: UserModel, index: number) => {
                                    return <NavLink to={`/AboutUser/${player._id}`} className={styles.PlayerFullName} key={index}>
                       {player.fullName}
                                        {index < 6 && index < players.length - 1 && ','}
                                        {index === 6 && data.players.length > 7 && '...'}
                            </NavLink>
                                })  : <span style={{paddingLeft: '20px'}}>Здесь пока ещё нет учатсников</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                    {isParticipating ?
                        <div className={styles.LeaveFromTournament}>
                            Вы участвуете в этом турнире
                            <button onClick={LeaveFromTournament} className={styles.Buttons}>Покинуть турнир</button>
                        </div>
                        : <button onClick={followForTournament} className={styles.Buttons}>Участвовать</button>
                    }

                    <div>
                        {userData?._id === data?.Owner?._id &&
                            <div className={styles.updateAndDelete}>
                                <NavLink className={styles.NavLink}
                                         to={`/tournaments/${id}/edit`}>редактировать</NavLink>
                                <button className={styles.RemoveTournament} onClick={RemoveTournament}>удалить</button>
                            </div>
                        }
                    </div>
                    </div>
                    <div className={styles.rightMenu}>
                        Создатель турнира:
                        <div className={styles.OwnerAndTime}>
                            <img className={styles.UserIcon}
                                 src={data.Owner.avatarURL ? `http://localhost:3000${data.Owner.avatarURL}` : UserIcon}/>
                            <NavLink to={`/aboutUser/${data.Owner._id}`}
                                     className={styles.NavLinkName}>{data.Owner.fullName}</NavLink>

                        </div>
                        <span className={styles.time}>
                    {modifiedString?.slice(0, 16)}
                        </span>
                    </div>

                </div>
            }
        </div>
    )
}
export default FullTournament;