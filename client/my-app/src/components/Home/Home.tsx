import {useEffect} from "react";
import {fetchTournaments} from "../../redux/TournamentsReducer";
import {AppStateType, useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import isLoading from "../../helpers/isLoading";
import IsLoading from "../../helpers/isLoading";
import {TournamentModel} from "../../models/tournament-model";
import {PlayersModel} from "../../models/Players-model";
const Home = () => {
    const dispatch = useAppDispatch();
    const {tournaments} = useSelector((state: AppStateType) => state.tournaments);
    const isTournamentLoading = tournaments.status;

    useEffect(() => {
       dispatch(fetchTournaments());
    }, []);
    if(isTournamentLoading === 'loading') {
        return <IsLoading />
    }
    return (
        <div>
            <div>
                {isTournamentLoading === 'loaded' && tournaments.items.map((obj: TournamentModel, index: number) => {
                    return <div key={index}>
                        {obj.Name}
                        {obj.about}
                        {obj.user?.fullName}
                        {obj.players.map((player: any, index ) => {
                            return <div key={index}>
                                {player.rank}
                                {player.nickname}
                            </div>
                        })}
                    </div>
                })}
            </div>

        </div>
    )
};
export default Home;