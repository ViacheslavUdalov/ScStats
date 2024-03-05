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
const initialState = {
    data: null as AuthModel | null,
    status: 'loading'
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
                state.status = 'loading'
                state.data = null
            })
            .addCase(fetchAuth.fulfilled, (state, action: rootStateType) => {
                state.status = 'loaded'
                state.data = action.payload

            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = 'error'
                state.data = null
            })
            .addCase(fetchRegister.pending, (state, action: rootStateType) => {
                state.status = 'loading'
                state.data = null

            })
            .addCase(fetchRegister.fulfilled, (state, action: rootStateType) => {
                state.status = 'loaded'
                state.data = action.payload

            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'error'
                state.data = null
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading'
                state.data = null
            })
            .addCase(fetchAuthMe.fulfilled, (state, action: rootStateType) => {
                state.status = 'loaded'
                state.data = action.payload

            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error'
                state.data = null
            })
            .addCase(fetchEditMe.pending, (state) => {
                state.status = 'loading'
                state.data = null
            })
            .addCase(fetchEditMe.fulfilled, (state, action: rootStateType) => {
                state.status = 'loaded'
                state.data = action.payload

            })
            .addCase(fetchEditMe.rejected, (state) => {
                state.status = 'error'
                state.data = null
            })
    }
});
export const selectIsAuth = (state: rootStateType) => Boolean(state.auth.data)
export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;