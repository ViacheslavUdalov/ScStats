import React, {MouseEventHandler, useEffect, useState} from "react";
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
import {generateBracket, simulateMatches} from "../../helpers/createMatches";
import Click from "../../common/Click.png";
import Modal from "../../helpers/Modal";
import {Simulate} from "react-dom/test-utils";
import {PlayerBracket, PlayerBracketWithoutScore} from "../../models/PlayerBracket";
import {Match} from "../../models/match";


const FullTournament = React.memo(() => {
        const {id} = useParams();
        // @ts-ignore
        const {data: tournament, isLoading} = useGetFullTournamentQuery(id);

        const CurrentClient = useSelector((state: rootStateType) => state.auth.data);
        type OpenIndexState = Record<number, number>;
        const userData = useSelector((state: rootStateType) => state.auth.data);
        const isAuth = useSelector(selectIsAuth);
        const navigate = useNavigate();
        const [isParticipating, setParticipating] = useState(false)
        const [isFetching, setIsFetching] = useState(false)
        const [UpdatePlayers, setUpdatePlayers] = useState(tournament?.players);
        let initialBracket = tournament && tournament.bracket ?  tournament.bracket : [[]];
        // console.log(initialBracket)
        const [bracket, setBracket] = useState(initialBracket);
        const [openIndex, setOpenIndex] = useState<OpenIndexState>({});
        const [modalIsOpen, setModalOpen] = useState(false);
        const [messageError, setMessageError] = useState('');
        const [scoreP1, setScoreP1] = useState(0);
        const [scoreP2, setScoreP2] = useState(0);
const closeModal = () => {
    setModalOpen(false)
}
        const handleScoreP1 = (e: any) => {
            setScoreP1(e.target.value);
        }
        const handleScoreP2 = (e: any) => {
            setScoreP2(e.target.value);
        }
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
                await instance.patch(`/tournaments/${tournament._id}`, updateTournament)
                setParticipating(true)
                setIsFetching(false);
            } else {
                console.log('вы уже участвуете в этом турнире')
            }
        }

        useEffect(() => {
            setBracket(initialBracket)

        }, []);


        const players = UpdatePlayers ? UpdatePlayers : tournament?.players
        useEffect(() => {
            tournament && tournament.players.map((player: UserModel) => {
                    if (player?._id === userData?._id) {
                        setParticipating(true)
                    }
                }
            )
        }, [players])
        const openModal = (columnIndex: number, pairIndex: number) => {
            if (openIndex[columnIndex] === pairIndex) {
                const {[columnIndex]: removedIndex, ...rest} = openIndex;
                setOpenIndex(rest);
            } else {
                setOpenIndex({...openIndex, [columnIndex]: pairIndex});
            }
        }
const  createBracket = async () => {
    if (tournament) {
    if (players && players.length > 3) {
        let insideBracket = [simulateMatches(players)];
        console.log(insideBracket)
        let bracketForServer = generateBracket(insideBracket, insideBracket[0].length)
        console.log(bracketForServer)
      setBracket(bracketForServer);
        initialBracket = bracketForServer;
        console.log(initialBracket)
        await instance.patch(`/tournaments/${tournament?._id}`, {...tournament, bracket: bracketForServer})
    }} else {
        console.log('Нельзя создать сетку, если меньше трёх игороков')
    }
}
        // console.log(bracket)
const setWinner = async (pair: PlayerBracket[], scoreForPlayer1: number, scoreForPlayer2: number, colIndex: number, pairIndex: number) => {

if (colIndex === bracket.length - 1) {
    setModalOpen(true)
    setMessageError('следующего раунда не будет')
    return;
}
    let nextMatchIndex = Math.floor(pairIndex / 2);
    const updatedBracket = [...initialBracket];
    updatedBracket[colIndex + 1] = [...updatedBracket[colIndex + 1]];
    // updatedBracket[colIndex + 1][nextMatchIndex] = [...updatedBracket[colIndex + 1][nextMatchIndex]];

    let currMatch = updatedBracket[colIndex][pairIndex];
    currMatch.players[0].score = scoreForPlayer1;
    let playerData1 = {
        _id: currMatch.players[0]._id,
        fullName: currMatch.players[0].fullName
    }
    currMatch.players[1].score = scoreForPlayer2;
    let playerData2 = {
        _id: currMatch.players[1]._id,
        fullName: currMatch.players[1].fullName
    }
    let winner: PlayerBracketWithoutScore;
    scoreForPlayer1 > scoreForPlayer2 ? winner = playerData1 : winner = playerData2;
    currMatch.winner = winner;
    if (updatedBracket[colIndex + 1] && updatedBracket[colIndex + 1][nextMatchIndex]) {
        const nextMatch = updatedBracket[colIndex + 1][nextMatchIndex];
            if (nextMatch.players.some((player) => player._id === winner._id) || nextMatch.players.length === 2) {
                setModalOpen(true)
                setMessageError('игрок уже есть в следующем раунде')
                return;
        }
    }


   updatedBracket[colIndex + 1][Math.floor(pairIndex / 2)].players.push({...currMatch.winner, score: 0});
          await setBracket(updatedBracket);
    initialBracket = updatedBracket;
    await instance.patch(`/tournaments/${tournament?._id}`, {...tournament, bracket: updatedBracket})
}
        const charactersToRemove = ["T", "Z"];
        const modifiedString = tournament?.createdAt
            .replace(new RegExp(`[${charactersToRemove.join('')}]`, 'g'), ' ');
        return (
            <div className={styles.main}>
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
                                {userData?._id === tournament?.Owner._id &&
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
                                {CurrentClient?._id === tournament.Owner._id && tournament.bracket.length === 0 &&
                                    <div>
                                        <button onClick={createBracket} className={styles.RemoveTournament}>Создать сетку</button>
                                    </div>

                                }
                        </span>
                        </div>

                    </div>
                }
                <div>
                    {bracket ?
                        <div className={styles.parentbracket}>
                            <span>Сетка (Если сетка не появилась, обновите страницу)</span>
                            <div className={styles.allColumns}>

                                {bracket.map((column, columnIndex: number) => {
                                    return (
                                        <div key={columnIndex} className={styles.allPairs}>
                                            <div>
                                                {column.map((pair, pairIndex: number) => {
                                                    console.log(pair)
                                                    return (
                                                        <div className={styles.parentformodal} key={pairIndex}>
                                                            <Modal isOpen={modalIsOpen} onClose={closeModal}>
                                                                <div className={styles.inSideModal}>
                                                                    <span className={styles.LogoutFromAcc}>{messageError}</span>
                                                                </div>
                                                            </Modal>
                                                            <div
                                                                className={`${styles.modal} ${openIndex[columnIndex] === pairIndex ? styles.seemodal : styles.hidemodal}`}>
                                                                первый
                                                                <input type="text" value={scoreP1} onChange={handleScoreP1}/>
                                                                второй
                                                                 <input type="text" value={scoreP2} onChange={handleScoreP2}/>
                                                                <button onClick={() => setWinner(pair.players, scoreP1, scoreP2, columnIndex, pairIndex)}>Отправить результат</button>
                                                                Что бы Сообщить
                                                                результат дважды кликните на игрока.
                                                            </div>
                                                            <img src={Click} alt="click" className={styles.click}
                                                                 onClick={() => openModal(columnIndex, pairIndex)}/>
                                                            <div key={pairIndex} className={styles.pair}>
                                                                {pair.players.map((user: PlayerBracket, index) => {
                                                                    return (
                                                                        <div key={index} className={styles.user}>
                                                                            {user.fullName}
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