import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    cartItem: [],
    totalPrice: 0,
    itemLiked: [],
    screenDefault: false
}


const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { _id } = action.payload;
            const index = state.cartItem.findIndex(item => item._id === _id);

            if (index < 0) state.cartItem.push(action.payload);
            else {
                state.cartItem[index].quantity += action.payload.quantity;
                state.cartItem[index].subTotal += action.payload.subTotal;
            }
            //totoPrice 
            state.totalPrice = state.cartItem.reduce((a, b) => a + b.subTotal, 0);
        },
        removeItemInCart: (state, action) => {
            //handle remove
        },
        updateCart: (state, action) => {
            //handle update
        },
        likedList: (state, action) => {
            state.itemLiked.push(action.payload);
        },
        checkOut: (state, action) => {
            state.screenDefault = action.payload;
        }
    }
})

const { actions, reducer } = cart;
export const { addToCart, removeItemInCart, updateCart, likedList, checkOut } = actions;
export default reducer;
