import {useSelector} from "react-redux";
import IsLoading from "../../helpers/isLoading";
import {TournamentModel} from "../../models/tournament-model";
import {rootStateType, useAppDispatch} from "../../redux/store";
import {useGetAllTournamentsQuery} from "../../redux/RTKtournaments";
const Home = () => {
    const dispatch = useAppDispatch();
    // const {tournaments} = useSelector((state: rootStateType) => state.tournaments);
    const {data, isLoading} = useGetAllTournamentsQuery({
        page: 1,
    searchTerm: '',
        perPage: 10
    });
    if(isLoading ) {
        return <IsLoading />
    };
    console.log(data)
    return (
        <div>
            <div>
                {data &&  data.tournaments.map((obj: TournamentModel, index: number) => {
                    return <div key={index}>
                        {obj.Name}
                        {obj.about}
                        {obj.Owner?.fullName}
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