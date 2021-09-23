import { createSlice } from '@reduxjs/toolkit';


const modal = createSlice({
    name: 'modal',
    initialState: {
        loginModal: false,
        registerModal: false,
        isVisibleCartModal: false,
        isVisibleUserInfo: false,
    },
    reducers: {
        switchLoginModal: (state, action) => {

            const status = action.payload;
            status === true && (state.registerModal = false);

            state.loginModal = status;

        },
        switchRegisterModal: (state, action) => {

            const status = action.payload;
            status === true && (state.loginModal = false);

            state.registerModal = status;

        },
        switchCartModal: (state, action) => {

            const status = action.payload;
            state.isVisibleCartModal = status;

        },
        switchUserInfoDrawer: (state, action) => {

            const status = action.payload;
            state.isVisibleUserInfo = status;
        }
    }
})

const { actions, reducer } = modal;

export const { switchLoginModal, switchRegisterModal, switchCartModal, switchUserInfoDrawer } = actions;

export default reducer;

