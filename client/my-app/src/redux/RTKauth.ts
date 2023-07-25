import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {AuthModel, RegisterModel} from "../models/auth-model";

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery(
        {baseUrl: "http://localhost:3000"}),
    tagTypes: ['UserData'],
    endpoints: (builder) => ({
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
export const {useGetUserDataQuery, useLoginMutation,useRegisterMutation} = authAPI
