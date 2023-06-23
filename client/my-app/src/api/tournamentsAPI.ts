import instance from "./MainAPI";
import {TournamentModel} from "../models/tournament-model";
export const TournamentsAPI = {
    fetchALL() {
        return instance.get('tournaments').then((res) => {
         return res.data
        })
    },
    fetchOne(id: string) {
     return instance.get(`/tournaments${id}`).then((res) => {
            return res.data
        })},
    fetchDelete(id: string) {
        return instance.delete(`/tournaments${id}`).then((res) => {
            return res.data
        })},
    fetchUpdate(params: TournamentModel) {
        const {_id, ...data} = params;
       return  instance.patch(`/tournaments/${_id}`, data).then((res) => {
           return res.data
       })
    }
}