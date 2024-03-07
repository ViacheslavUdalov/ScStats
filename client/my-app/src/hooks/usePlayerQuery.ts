import {useGetOneUserQuery} from "../redux/RTKtournaments";

const usePlayerQuery = (playerId: string) => {
    return useGetOneUserQuery(playerId);
}
export default usePlayerQuery;