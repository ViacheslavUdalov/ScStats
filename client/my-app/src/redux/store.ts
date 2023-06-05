import {Action, AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import TournamentsReducer from "./TournamentsReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    TournamentPage: TournamentsReducer
})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppStateType = ReturnType<typeof rootReducer>;
type TypeDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type BaseThunkType<ActionTypes extends Action,
ReturnType = Promise<void>> = ThunkAction<ReturnType, AppStateType, unknown, ActionTypes>
export type ActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U}
    ? U : never;
export const useAppDispatch = () => useDispatch<TypeDispatch<AppStateType>>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
export default store;