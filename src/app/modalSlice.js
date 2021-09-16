import { createSlice } from '@reduxjs/toolkit';


const modal = createSlice({
    name: 'modal',
    initialState: {
        loginModal: false,
        registerModal: false,
        isVisibleCartModal: false
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
    }
})

const { actions, reducer } = modal;

export const { switchLoginModal, switchRegisterModal, switchCartModal } = actions;

export default reducer;

