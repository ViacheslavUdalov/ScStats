import {
    AnyAction,
    combineReducers,
    configureStore, Reducer,
    ThunkDispatch
} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "./authReducer";
import {tournamentsAPI} from "./RTKtournaments";
import {tournamentReducer} from "./TournamentsReducer";
import {UsersReducer} from "./UsersReducer";
import {authAPI} from "./RTKauth";

const rootReducer: Reducer = combineReducers({
    // tournaments: tournamentReducer,
    [tournamentsAPI.reducerPath] : tournamentsAPI.reducer,
    auth: authReducer,
tournaments: tournamentReducer,
    users: UsersReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tournamentsAPI.middleware)

});
type appType = ReturnType<typeof rootReducer>;
export type rootStateType = ReturnType<typeof store.getState>;
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export const useAppDispatch = () => useDispatch<TypedDispatch<rootStateType>>();
export const useAppSelector: TypedUseSelectorHook<rootStateType> = useSelector;
export default store;