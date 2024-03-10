import React, {MouseEventHandler, useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import styles from './FullTournament.module.css';
import {useGetFullTournamentQuery} from "../../redux/RTKtournaments";
import {useSelector} from "react-redux";
import {rootStateType} from "../../redux/store";
import instance from "../../api/MainAPI";
import {UserModel, UserModelForTournament} from "../../models/user-model";
import image from '../../common/StormGateLogo_BlackandWhite_Flat.png';
import PreLoader from "../../helpers/isLoading";
import UserIcon from '../../common/images.png'
import {selectIsAuth} from "../../redux/authReducer";
import {generateBracket, simulateMatches} from "../../helpers/createMatches";
import Click from "../../common/Click.png";
import Modal from "../../helpers/Modal";
import {PlayerBracket, PlayerBracketWithoutScore} from "../../models/PlayerBracket";
import {Match} from "../../models/match";
import {CalculateRatingChange} from "../../helpers/eloCalculator";


const FullTournament = React.memo(() => {
    const {id} = useParams();
    // @ts-ignore
    const {data: tournament, isLoading} = useGetFullTournamentQuery(id);

    const CurrentClient = useSelector((state: rootStateType) => state.auth.data);
    type OpenIndexState = Record<number, number>;
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();
    const [isParticipating, setParticipating] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    console.log(tournament);
    const [localTournament, setTournament] = useState(tournament);
    console.log(localTournament)
    const [openIndex, setOpenIndex] = useState<OpenIndexState>({});
    const [modalIsOpen, setModalOpen] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [scoreP1, setScoreP1] = useState(0);
    const [scoreP2, setScoreP2] = useState(0);
    const handleScoreP1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScoreP1(Number(e.target.value));
    }
    const handleScoreP2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScoreP2(Number(e.target.value));
    }
    const closeModal = () => {
        setModalOpen(false)
    }
    const RemoveTournament = async () => {
        if (window.confirm('Вы действительно хотите удалить турнир?')) {
            if (localTournament && localTournament._id != null) {
                await instance.delete(`/tournaments/${localTournament._id}`);
                navigate('/tournaments');
            }
        }
    }
    useEffect(() => {
        setTournament(tournament)
    }, [localTournament, tournament])
    const LeaveFromTournament = async () => {
        if (!localTournament) {
            return <PreLoader/>
        }
        if (isParticipating && localTournament) {
            setIsFetching(true);
            const updatePlayers = localTournament.players.filter((player: UserModel) => player._id !== CurrentClient._id)
            const updateTournament = {
                ...localTournament,
                players: updatePlayers
            }
            let response = await instance.patch(`/tournaments/${localTournament._id}`, updateTournament)
            await setTournament(response.data)
            setParticipating(false)
            setIsFetching(false)
        } else {
            console.log('что-то пошло не так')
        }
    }
    const followForTournament = async () => {
        if (!localTournament) {
            return <PreLoader/>
        }
        if (!isParticipating && localTournament && !localTournament.players.includes(CurrentClient)) {
            setIsFetching(true);
            const updatePlayers = [...localTournament.players, CurrentClient]
            const updateTournament = {
                ...localTournament,
                players: updatePlayers
            }
            let response = await instance.patch(`/tournaments/${updateTournament._id}`, updateTournament);
            await setTournament(response.data);
            setParticipating(true)
            setIsFetching(false);
        } else {
            console.log('вы уже участвуете в этом турнире')
        }
    }
    useEffect(() => {
        localTournament && localTournament.players.map((player: UserModel) => {
                if (player?._id === CurrentClient?._id) {
                    setParticipating(true);
                }
            }
        )
        setTournament(localTournament);
    }, [localTournament])
    const openModal = (columnIndex: number, pairIndex: number) => {
        if (openIndex[columnIndex] === pairIndex) {
            const {[columnIndex]: removedIndex, ...rest} = openIndex;
            setOpenIndex(rest);
        } else {
            setOpenIndex({...openIndex, [columnIndex]: pairIndex});
        }
    }
    const createBracket = async () => {
        console.log(localTournament);
        if (localTournament) {
            if (localTournament.players && localTournament.players.length > 3) {
                let insideBracket = [simulateMatches(localTournament.players)];
                console.log(insideBracket)
                let bracketForServer = generateBracket(insideBracket, insideBracket[0].length)
                console.log(bracketForServer)
                let response = await instance.patch(`/tournaments/${localTournament?._id}`, {
                    ...localTournament,
                    bracket: bracketForServer
                });
                setTournament(response.data);
            }
        } else {
            console.log('Нельзя создать сетку, если меньше трёх игороков')
        }
    }
           const setWinner = async (pair: PlayerBracket[], scoreForPlayer1: number = 0, scoreForPlayer2: number = 0, colIndex: number, pairIndex: number) => {


            let nextMatchIndex = Math.floor(pairIndex / 2);
            let updatedBracket = JSON.parse(JSON.stringify(localTournament?.bracket));
            let currMatch = updatedBracket[colIndex][pairIndex];


            const updatedPlayers = currMatch.players.map((player: UserModelForTournament, index: number) => {
                if (index === 0) {
                    return {...player, score: scoreForPlayer1}
                } else {
                    return {...player, score: scoreForPlayer2}
                }
            })

            let playerOne: UserModel, playerTwo: UserModel;
              const data =  await instance.get(`/user/${updatedPlayers[0]._id}`);
            console.log(data)
               const data2 =  await instance.get(`/user/${updatedPlayers[1]._id}`);
               console.log(data2)



            const winner: PlayerBracketWithoutScore = scoreForPlayer1 > scoreForPlayer2 ? {
                _id: updatedPlayers[0]._id,
                fullName: updatedPlayers[0].fullName,
                rank: updatedBracket[0].rank
            } : {
                _id: updatedPlayers[1]._id,
                fullName: updatedPlayers[1].fullName,
                rank: updatedBracket[1].rank
            };


            currMatch.winner = winner;
            currMatch.players = updatedPlayers;

               if (scoreForPlayer1 > scoreForPlayer2) {
                   if (data && data2) {
                       console.log(`ранк игрока один ${data.data.rank}`)
                       data.data.rank = data.data.rank + CalculateRatingChange(data.data.rank, data2.data.rank, 1);
                       data.data.matches = [...data.data.matches, currMatch]
                       const {data: responseForPlayerOne} =  await instance.patch(`/user/editrankandmatchhistory/${data.data._id}`, data.data)
                       console.log(`ранк игрока один ${data.data.rank}`)
                       console.log(responseForPlayerOne)
                       console.log(`ранк игрока один ${data2.data.rank}`)
                       data2.data.rank = data2.data.rank + CalculateRatingChange(data2.data.rank, data.data.rank, 0);
                       data2.data.matches = [...data2.data.matches, currMatch]
                       console.log(`ранк игрока один ${data2.data.rank}`)

                       const {data: responseForPlayerTwo} =  await instance.patch(`/user/editrankandmatchhistory/${data2.data._id}`, data2.data)
                       console.log(responseForPlayerTwo)
                   }
               } else if (scoreForPlayer1 < scoreForPlayer2) {
                   if (data && data2) {
                       console.log(`ранк игрока один ${data.data.rank}`)
                       data.data.rank = data.data.rank + CalculateRatingChange(data.data.rank, data2.data.rank, 1);
                       data.data.matches = [...data.data.matches, currMatch]
                       console.log(`ранк игрока один ${data.data.rank}`)
                       const {data: responseForPlayerOne} =  await instance.patch(`/user/editrankandmatchhistory/${data.data._id}`, data.data)
                       console.log(responseForPlayerOne)
                       console.log(`ранк игрока два ${data2.data.rank}`)
                       data2.data.rank = data2.data.rank + CalculateRatingChange(data2.data.rank, data.data.rank, 0);
                       data2.data.matches = [...data2.data.matches, currMatch]
                       console.log(`ранк игрока два ${data2.data.rank}`)
                       const {data: responseForPlayerTwo} =  await instance.patch(`/user/editrankandmatchhistory/${data2.data._id}`, data2.data);
                       console.log(responseForPlayerTwo)

                   }
               }


            updatedBracket[colIndex][pairIndex] = currMatch;

            
            if (localTournament?.bracket && colIndex !== localTournament?.bracket.length - 1 || updatedBracket[colIndex + 1] && updatedBracket[colIndex + 1][nextMatchIndex]) {
                const nextMatch = updatedBracket[colIndex + 1][nextMatchIndex];
                if (nextMatch.players.some((player: UserModel) => player._id === winner._id) || nextMatch.players.length === 2) {
                    setModalOpen(true)
                    setMessageError('игрок уже есть в следующем раунде')
                    return;
                }
                updatedBracket[colIndex + 1][Math.floor(pairIndex / 2)].players.push({...currMatch.winner, score: 0});
            }

            let response = await instance.patch(`/tournaments/${localTournament?._id}`, {
                ...localTournament,
                bracket: updatedBracket

            })

            setTournament(response.data);
        }


        const charactersToRemove = ["T", "Z"];
        const modifiedString = localTournament?.createdAt
            .replace(new RegExp(`[${charactersToRemove.join('')}]`, 'g'), ' ');
        return (
            <div className={styles.main}>
                {isLoading && <PreLoader/>}
                {localTournament &&
                    <div className={styles.container}>
                        <div className={styles.MainInfo}>
                            <img className={styles.image}
                                 src={localTournament?.imageUrl ? `http://localhost:3000${localTournament?.imageUrl}`
                                     : image}/>
                            <div className={styles.about}>
                                <h1 className={styles.NameOfTournament}>{localTournament?.Name}</h1>
                                <div>
                                    <span style={{fontSize: 'small'}}>О турнире:</span>
                                    <div className={styles.AboutTournament}>{localTournament?.about}</div>
                                </div>
                                <span style={{fontSize: 'small'}}>Всего участников: {localTournament?.players.length}</span>
                                <div className={styles.player}>
                                    {localTournament?.players.length ?
                                        localTournament?.players?.slice(0, 7).map((player: UserModel, index: number) => {
                                            return <NavLink to={`/AboutUser/${player?._id}`}
                                                            className={styles.PlayerFullName} key={index}>
                                                {player?.fullName}
                                                {index < 6 && index < localTournament?.players?.length - 1 && ','}
                                                {index === 6 && localTournament?.players.length > 7 && '...'}
                                            </NavLink>
                                        }) : <span style={{paddingLeft: '20px'}}>Здесь пока ещё нет учатсников</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            {isAuth || window.localStorage.getItem('token') ?
                                <div>
                                    {localTournament?.bracket.length === 0 &&
                                        <div>
                                            {(isParticipating) ?
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
                                                    <div>
                                                        <button onClick={followForTournament}
                                                                className={styles.Buttons}>Участвовать
                                                        </button>
                                                    </div>
                                                }
                                                </div>
                                            }

                                        </div>
                                    }
                                </div> :
                                <span className={styles.ForPlaying}>
                        Зарегистрируйтесь или войдите в аккаунт, что бы участвовать в турнире.
                    </span>
                            }
                            <div>
                                {CurrentClient?._id === localTournament?.Owner._id &&
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
                                         src={localTournament.Owner.avatarURL ?
                                             `http://localhost:3000${localTournament.Owner.avatarURL}` : UserIcon}/>
                                </div>
                                <NavLink to={`/aboutUser/${localTournament.Owner._id}`}
                                         className={styles.NavLinkName}>{localTournament.Owner.fullName}</NavLink>
                            </div>
                            <span className={styles.time}>
                   <span style={{color: "white"}}>Дата создания: </span>{modifiedString?.slice(0, 16)}
                                {CurrentClient?._id === localTournament.Owner._id && localTournament.bracket.length === 0 &&
                                    <div>
                                        <button onClick={createBracket} className={styles.RemoveTournament}>Создать сетку
                                        </button>
                                    </div>

                                }
                        </span>
                        </div>

                    </div>
                }
                <div>
                    {localTournament?.bracket ?
                        <div className={styles.parentbracket}>
                            <span>Сетка (Если сетка не появилась, обновите страницу)</span>
                            <div className={styles.allColumns}>

                                {localTournament?.bracket.map((column, columnIndex: number) => {
                                    return (
                                        <div key={columnIndex} className={styles.allPairs}>
                                            <div>
                                                {column.map((pair: Match, pairIndex: number) => {
                                                    return (

                                                        <div className={styles.parentformodal} key={pairIndex}>


                                                            <Modal isOpen={modalIsOpen} onClose={closeModal}>
                                                                <div className={styles.inSideModal}>
                                                                    <span
                                                                        className={styles.LogoutFromAcc}>{messageError}</span>
                                                                </div>
                                                            </Modal>

                                                            <div
                                                                className={`${styles.modal} ${openIndex[columnIndex] === pairIndex ? styles.seemodal : styles.hidemodal}`}>
                                                                {pair.winner ?
                                                                    <div className={styles.matchplayed}>Матч сыгран.</div> :
                                                                    <div>
                                                                        Верхний игрок:
                                                                        <input type="text" value={scoreP1}
                                                                               onChange={handleScoreP1}/>
                                                                        Нижний игрок:
                                                                        <input type="text" value={scoreP2}
                                                                               onChange={handleScoreP2}/>
                                                                        <button
                                                                            onClick={() => setWinner(pair.players, scoreP1, scoreP2, columnIndex, pairIndex)}>Отправить
                                                                            результат.
                                                                        </button>
                                                                    </div>
                                                                }
                                                            </div>

                                                            <img src={Click} alt="click" className={styles.click}
                                                                 onClick={() => openModal(columnIndex, pairIndex)}/>
                                                            <div key={pairIndex} className={styles.pair}>
                                                                {pair.players?.map((user: PlayerBracket, index) => {
                                                                    const isWinner = pair.winner && user._id === pair.winner._id;
                                                                    return (
                                                                        <div key={index}
                                                                             className={`${styles.user} ${isWinner ? styles.usernameWithChange : ''}`}>
                                                                            <span
                                                                                className={`${styles.username}`}>{user.fullName}</span>
                                                                            <span className={styles.score}>
                                                                                {user.score}
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                            {(column.length > 1 && pairIndex !== column.length) && (
                                                                <div className={styles.lineRight}></div>
                                                            )}
                                                            {(pairIndex % 2 === 0 && pairIndex !== column.length - 1) &&
                                                                <div className={styles.lineDown}></div>
                                                            }
                                                            {(pairIndex % 2 !== 0) && (
                                                                <div className={styles.lineUp}></div>
                                                            )}
                                                        </div>
                                                    )

                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        :
                        <span>Ничего нет</span>
                    }
                </div>
            </div>
        )
    }
)
export default FullTournament;