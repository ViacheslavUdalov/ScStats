import {AnyAction, configureStore, Dispatch, ThunkDispatch} from "@reduxjs/toolkit";
import {tournamentReducer} from "./TournamentsReducer";
import {useDispatch} from "react-redux";
import {authReducer} from "./authReducer";

// @ts-ignore
const store = configureStore({
    reducer: {
tournaments: tournamentReducer,
        auth: authReducer
    }
});
// @ts-ignore
export type AppStateType = ReturnType<typeof store.getState>;
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export const useAppDispatch = () => useDispatch<TypedDispatch<AppStateType>>();
export default store;