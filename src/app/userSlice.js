import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserApi } from 'api/UserApi';


export const getMe = createAsyncThunk('user/getMe', async () => {

    const currentUser = await UserApi.getMe();
    return currentUser;
})

export const login = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
    //handle login
    try {
        const { token, refreshToken } = await UserApi.user_login(data);
        return { token, refreshToken };

    } catch (err) {
        return rejectWithValue(err.response.data);
    }

})

export const register = createAsyncThunk('user/register', async (data, { rejectWithValue }) => {
    //handle register
    try {
        const { message } = await UserApi.user_register(data);
        return { message };

    } catch (err) {
        return rejectWithValue(err.response.data);
    }

})

const initialState = {
    currentUser: {
        auth: {
            token: null,
            refreshToken: null,
        },
        user: {},
        isAuth: false
    },
    loading: false,
    error: ''

}


const user = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        //handle get my info
        [getMe.pending]: (state) => {
            state.loading = true;
        },
        [getMe.fulfilled]: (state, action) => {

            state.loading = false;
            state.currentUser.isAuth = true;
            state.currentUser.user = action.payload;
        },
        [getMe.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        //handle login
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser.auth = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        //handle register
        [register.pending]: (state) => {
            state.loading = true;
        },
        [register.fulfilled]: (state) => {
            state.loading = false;
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

    }
})

const { reducer } = user;

export default reducer;