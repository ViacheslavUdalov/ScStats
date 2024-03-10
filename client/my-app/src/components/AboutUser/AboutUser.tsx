import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {rootStateType} from "../../redux/store";
import styles from './AboutUser.module.css'
import image from '../../common/images.png'
import {NavLink, useParams} from "react-router-dom";
import {useGetOneUserQuery} from "../../redux/RTKtournaments";
import PreLoader from "../../helpers/isLoading";
import {UserModel} from "../../models/user-model";
import {createPages} from "../../helpers/Paginator";

const AboutUser = () => {
    const {id} = useParams()
    const CurrentClient = useSelector((state: rootStateType) => state.auth.data);
    const [pageIndex, setPageIndex] = useState(1);
    const [perPage, setPerPage] = useState(30);
    // @ts-ignore
    const {data: UserData, isLoading, refetch} = useGetOneUserQuery(id)
    console.log(UserData)
    useEffect(() => {
        refetch()
    }, [UserData])
    if (isLoading) {
        return <PreLoader/>
    }
    const pages: Array<number> = [];
    const totalMatches = UserData && UserData.matches.length - 1;
    const totalPages = totalMatches && Math.ceil(totalMatches / perPage);
    createPages(pages, totalPages, pageIndex)
    return (
        <div className={styles.container}>
            {UserData && <div>
                <div className={styles.topPageInfo}>
                    <div className={styles.imageContainer}>
                        <img src={UserData?.avatarURL ? `http://localhost:3000${UserData?.avatarURL}` : image}
                             className={styles.UserIcon}/>
                    </div>

                    <span>НикНейм:<h2>{UserData.fullName}</h2></span>
                    <span> Рейтинг:<h2>{UserData.rank}</h2></span>
                    <span>Почта пользователя:<h5>{UserData.email}</h5></span>
                    <span>Старана:<h5>{UserData.country}</h5></span>
                    {UserData?._id === CurrentClient?._id &&
                        <NavLink to={`/aboutUser/${UserData._id}/edit`}
                                 className={styles.NavLinkName}>Редактировать</NavLink>}
                </div>



                <div className={styles.dataofAllMatches}>
                    История Матчей:
                    {UserData.matches.map((match, index) => {
                        return <div key={index} className={styles.dataofMatch}>
                            {/*<div>{match.matchDate}</div>*/}

                            {match.players.map((player, index) => {
                                const isWinner = match.winner && player._id === match.winner._id
                                return <div key={index} className={styles.dataOfMatchPlayer}>
                                    {isWinner
                                        ? <span style={{color: 'green', scale: '0.5'}} className="material-symbols-outlined">arrow_upward</span>
                                        : <span style={{color: 'red', scale: '0.5'}} className="material-symbols-outlined">arrow_downward</span>
                                    }
                                    <span style={{paddingRight: '10px'}}>{player.score}</span>
                                    <span>{player.fullName}</span>
                                </div>
                            })
                            }
                        </div>
                    })
                    }
                    <div className={styles.pagination}>
                    {pages.map((page: number, index: number) =>
                            <span key={index}
                                  className={pageIndex == page ? styles.currentPage : styles.page}
                                  onClick={() => setPageIndex(page)}>
{page}
                </span>
                    )}
                        </div>
                </div>
            </div>
            }
        </div>
    );
};

export default AboutUser;