import {createSlice, createAsyncThunk, AnyAction} from "@reduxjs/toolkit";
import instance from "../api/MainAPI";
import {AuthModel, RegisterModel} from "../models/auth-model";
import {rootStateType} from "./store";
import {UserModel} from "../models/user-model";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params: AuthModel, thunkAPI) => {
    const response = await instance.post('auth/login', params);
    if (response.status === 200) {
        return response.data;
}})
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    let response = await instance.get('auth/me');
    if (response.status === 200) {
        return response.data;
    }
     else if (response.status === 403) {
         return response
    }
})
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: RegisterModel) => {
    const response = await instance.post('auth/register', params);
    return response.data;
})
export const fetchEditMe = createAsyncThunk('auth/fetchEditMe', async (params: UserModel) => {
    const response = await instance.patch('auth/edit', params)
    return response.data
})
interface InitialStateType {
    data: UserModel | null,
    isLoading: boolean
}
const initialState: InitialStateType = {
    data: null,
   isLoading: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: rootStateType) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.isLoading = true
                state.data = null
            })
            .addCase(fetchAuth.fulfilled, (state, action: rootStateType) => {
                state.isLoading = false
                state.data = action.payload

            })
            .addCase(fetchAuth.rejected, (state) => {
                state.isLoading = false
                state.data = null
            })
            .addCase(fetchRegister.pending, (state, action: rootStateType) => {
                state.isLoading = true
                state.data = null

            })
            .addCase(fetchRegister.fulfilled, (state, action: rootStateType) => {
                state.isLoading = false
                state.data = action.payload

            })
            .addCase(fetchRegister.rejected, (state) => {
                state.isLoading = false
                state.data = null
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.isLoading = true
                state.data = null
            })
            .addCase(fetchAuthMe.fulfilled, (state, action: rootStateType) => {
                state.isLoading = false
                state.data = action.payload

            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.isLoading =false
                state.data = null
            })
            .addCase(fetchEditMe.pending, (state) => {
                state.isLoading = true
                state.data = null
            })
            .addCase(fetchEditMe.fulfilled, (state, action: rootStateType) => {
                state.isLoading = false
                state.data = action.payload

            })
            .addCase(fetchEditMe.rejected, (state) => {
                state.isLoading = false
                state.data = null
            })
    }
});
export const selectIsAuth = (state: rootStateType) => Boolean(state.auth.data)
export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;