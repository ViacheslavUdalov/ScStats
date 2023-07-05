import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {DataTournamentModel, queryParams, TournamentModel} from "../models/tournament-model";
import CreateTournament from "../components/Tournaments/CreateTournament/createTournament";

export const tournamentsAPI = createApi({
    reducerPath: 'tournamentsAPI',
    baseQuery: fetchBaseQuery(
        {baseUrl: "http://localhost:3000"}),
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
        createTournament: builder.mutation<TournamentModel, Partial<TournamentModel>>({
            query: (tournament) => ({
                url: `tournaments`,
                method: 'POST',
                body: tournament
            }),
            invalidatesTags: ['Tournaments']
        }),
        updateTournament: builder.mutation<TournamentModel, Partial<TournamentModel>>({
            query: (tournament) => ({
                url: `/tournaments/${tournament._id}`,
                method: 'PATCH',
                body: tournament
            }),
            invalidatesTags: ['Tournaments']
        }),
        deleteTournament: builder.mutation<TournamentModel, TournamentModel>({
            query: (tournament) => ({
                url: `/tournaments/${tournament._id}`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Tournaments']
        })
    })
})
export const {useGetAllTournamentsQuery, useGetFullTournamentQuery,useDeleteTournamentMutation,
useCreateTournamentMutation, useUpdateTournamentMutation} = tournamentsAPI
