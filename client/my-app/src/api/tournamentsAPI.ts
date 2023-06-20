import instance from "./MainAPI";
export const TournamentsAPI = {
    fetchALL() {
        return instance.get('tournaments').then((res) => {
         return res.data
        })
    }
}