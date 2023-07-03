import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {DataTournamentModel, queryParams, TournamentModel} from "../models/tournament-model";

export const tournamentsAPI = createApi({
    reducerPath: 'tournamentsAPI',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000"}),
    tagTypes: ['Tournaments'],
    endpoints: (builder) => ({
        getAllTournaments: builder.query<DataTournamentModel, queryParams>({
            query: (params) => ({
                url: `/tournaments`,
                params: {
                    searchTerm: params.searchTerm,
                    page: params.page,
                    perPage: params.perPage
                }
            }),
            // transformResponse: (response: { data: TournamentModel[] }, meta, arg) => response.data
            providesTags: (result) => ['Tournaments']
        }),
        getFullTournament: builder.query<TournamentModel, string>({
            query: (id) => ({
                url: `/tournaments/${id}`
            })
        }),
    })
})
export const {useGetAllTournamentsQuery, useGetFullTournamentQuery} = tournamentsAPI
