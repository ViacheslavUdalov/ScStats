import {DataUsersModel, TournamentModel} from "../../models/tournament-model";
import {useGetAllTournamentsQuery, useGetUsersQuery} from "../../redux/RTKtournaments";
import styles from './home.module.css'
import {NavLink} from "react-router-dom";
import React, {useEffect, useLayoutEffect, useState} from "react";
import image from '../../common/4151292-1.jpg';
import image2 from '../../common/4151292-1.jpg';
import PreLoader from "../../helpers/isLoading";

const Home = React.memo(() => {
        const [visibleBlocks, setVisibleBlocks] = useState<string[]>([]);
    const {data: usersData, isFetching} = useGetUsersQuery({
        searchTerm: '',
        perPage: 10,
        page: 1
    })
        const {data: dataTournaments, isLoading} = useGetAllTournamentsQuery({
            page: 1,
            searchTerm: '',
            perPage: 10
        });
useLayoutEffect(() => {
    window.scrollTo(0, 1)
}, [])
        useEffect(() => {

            function handleScroll() {
                const blocks = document.querySelectorAll(`.${styles.block}`);
                const newVisibleBlocks = Array.from(blocks).filter(block => {
                    //   getBoundingClientRect() — метод, который возвращает размеры элемента
                    //   и его позицию относительно окна просмотра. Он возвращает объект DOMRect,
                    //   содержащий значения top, left, right, bottom, width и height элемента.
                    const rect = block.getBoundingClientRect();
                    return rect.top < window.innerHeight && rect.bottom >= 0;
                }).map(block => block.id)
                setVisibleBlocks(newVisibleBlocks)
            }

            window.addEventListener('scroll', handleScroll);
            handleScroll();

            return () => {
                window.removeEventListener('scroll', handleScroll);
            }
        }, [])
        return (
            <React.Fragment>
                <PreLoader isLoading={isLoading} />
                <div className={styles.container}>
                    <div className={`${styles.main} ${styles.block} ${visibleBlocks.includes('block1') ? styles.show : ''}`}
                         id='block1'>
                        <div className={styles.tournamentsparent}>
                        <h2 style={{paddingLeft: '20px', textDecoration: 'underline white'}}>Предстоящие турниры:</h2>
                        {dataTournaments && dataTournaments.tournaments.slice(0, 5).map((obj: TournamentModel, index: number) => {
                            const charactersToRemove = ["T", "Z"];
                            const modifiedString = obj.createdAt.replace(new RegExp(`[${charactersToRemove.join('')}]`, 'g'), ' ');
                            return <div className={styles.oneTournament} key={index}>
                                <div style={{display: 'flex'}}>
                                    <img src={obj?.imageUrl ? `http://localhost:3000${obj.imageUrl}` : image}
                                         className={styles.TournamentImage}/>
                                    <NavLink to={`/tournaments/` + obj?._id}
                                             className={styles.Participant}>{obj?.Name}</NavLink>
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
                </div>
                <div>


                    <div className={styles.thirdfraction} >
                        <div className={styles.secondfraction}>
                            <div className={`${styles.block} ${styles.secondfractioninside} ${visibleBlocks.includes('block2') ? styles.show : ''}`} id='block2'>
                              <div>
                                  <h3>Создавайте турниры</h3>
                                  <p>Создавайте турниры с призовым фондом с суммой любого размера,
                                      приглашайте игроков, повышайте призовой фонд.

                                  </p>
                                  <NavLink to={'/createtournament'}  className={styles.navFroCreateTournament}>Создать турнир</NavLink>
                              </div>
                                <img src={image2} alt="afasfafa" className={styles.image2}/>

                            </div>
                        </div>
                        <div className={`${styles.block} ${styles.parentusers} ${visibleBlocks.includes('block3') ? styles.show : ''}`} id='block3'>
                            <h3>Смотрите рейтинг лучших игроков</h3>
                            <div style={{width: '30%', margin: 'auto'}}>
                                {usersData?.users.map((user, index) => {
                                    return (
                                        <div key={index} className={styles.oneuserdata}>
                                           <span>{user.fullName}</span>
                                            <span>{user.rank}</span>
                                        </div>
                                    )
                                })}

                            </div>
                            <NavLink to={`/players`}
                                     className={styles.NavLinkName}>Перейти с списку игроков.</NavLink>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
)
export default Home;