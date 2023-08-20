import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {DataTournamentModel, queryParams, TournamentModel} from "../models/tournament-model";
import {AuthModel, RegisterModel} from "../models/auth-model";

export const tournamentsAPI = createApi({
    reducerPath: 'tournamentsAPI',
    baseQuery: fetchBaseQuery(
        {baseUrl: "http://localhost:3000"}),
    tagTypes: ['TournamentModel', 'UserData'],
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
            providesTags: (result) => ['TournamentModel']
        }),
        getFullTournament: builder.query<TournamentModel, string>({
            query: (id) => ({
                url: `/tournaments/${id}`
            }),
            providesTags:  ['TournamentModel']
        }),

        createTournament: builder.mutation<TournamentModel, Partial<TournamentModel>>({
            query: (tournament) => ({
                url: `/tournaments`,
                method: 'POST',
                body: tournament
            }),
            invalidatesTags: ['TournamentModel']
        }),
        updateTournament: builder.mutation<TournamentModel,  { _id: string| undefined; data: Partial<TournamentModel> }>({
            query: ({_id, data}) => ({
                url: `/tournaments/${_id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['TournamentModel']
        }),
        deleteTournament: builder.mutation<TournamentModel, string>({
            query: (id) => ({
                url: `/tournaments/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['TournamentModel']
        }),
        getUserData: builder.query<AuthModel, void>({
            query: () => ({
                url: `/auth/me`
            }),
            providesTags: ['UserData']
        }),
        Register: builder.mutation<RegisterModel, RegisterModel>({
            query: (user) => ({
                url: `/auth/register`
            }),
            invalidatesTags: ['UserData']
        }),
        Login: builder.mutation<AuthModel, AuthModel>({
            query: (user) => ({
                url: `/auth/login`
            }),
            invalidatesTags: ['UserData']
        })
    })
})
export const {useGetAllTournamentsQuery, useGetFullTournamentQuery,useDeleteTournamentMutation,
useCreateTournamentMutation, useUpdateTournamentMutation} = tournamentsAPI
