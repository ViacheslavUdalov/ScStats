import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {TournamentModel} from "../models/tournament-model";

export const tournamentsAPI = createApi({
    reducerPath: 'tournamentsAPI',
    baseQuery: fetchBaseQuery({baseUrl: '"http://localhost:3000"'}),
    tagTypes: ['Tournament'],
    endpoints: (builder) => ({
        getAllTournaments: builder.query<TournamentModel[], string>({
            query: (searchTerm: string) => `/tournaments/?search=${searchTerm}`,
            providesTags: (result, searchTerm, error) =>
                // result
                //     ? [
                //         ...result.map(({ Name }) => ({ type: 'Tournaments' as const, Name })),
                //         { type: 'Tournaments', Name: searchTerm},
                //     ]
                //     :
                [{ type: 'Tournament', Name: searchTerm }],
        })
    })
})
export const {useGetAllTournamentsQuery} = tournamentsAPI
