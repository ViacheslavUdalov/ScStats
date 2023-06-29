import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {TournamentModel} from "../models/tournament-model";
import * as querystring from "querystring";

export const tournamentsAPI = createApi({
    reducerPath: 'tournamentsAPI',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000"}),
    // tagTypes: ['Tournament'],
    endpoints: (builder) => ({
        getAllTournaments: builder.query<TournamentModel[], { searchTerm: string }>({
            query: ({ searchTerm }) => ({
                url: `tournaments?q=${searchTerm}`
            }),
            // transformResponse: (response: { data: TournamentModel[] }, meta, arg) => response.data
            // providesTags: (result,arg, error) => [
            //     { type: 'Tournament'}
            // ]
        })
    })
})
export const {useGetAllTournamentsQuery} = tournamentsAPI
