import axios from "axios";

export const tournamentsAPI = {
    setTournaments() {
        axios.get('http://localhost:3000/api/tournaments')
            .then((res) => res.data)
    }
}