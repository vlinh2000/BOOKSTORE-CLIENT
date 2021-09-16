import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    cartItem: [],
    totalPrice: 0,
    itemLiked: [],
    screenDefault: false
}

const getTotalPrice = (cartItem) => {
    return cartItem.reduce((a, b) => a + b.subTotal, 0).toFixed(2);
}


const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //handle add to cart
        addToCart: (state, action) => {
            const { _id } = action.payload;
            const index = state.cartItem.findIndex(item => item._id === _id);

            if (index < 0) state.cartItem.push(action.payload);
            else {
                state.cartItem[index].quantity += action.payload.quantity;
                state.cartItem[index].subTotal += action.payload.subTotal;
            }

            state.totalPrice = getTotalPrice(state.cartItem);
        },
        //handle remove
        removeItemInCart: (state, action) => {
            const { id } = action.payload;
            state.cartItem = state.cartItem.filter(item => item._id !== id);

            state.totalPrice = getTotalPrice(state.cartItem);
        },
        //handle update
        updateCart: (state, action) => {
            const { id, number } = action.payload;

            const index = state.cartItem.findIndex(item => item._id === id);

            if (number < 0 && state.cartItem[index].quantity === 1) return;

            state.cartItem[index].quantity += number;
            state.cartItem[index].subTotal = state.cartItem[index].quantity * state.cartItem[index].price

            state.totalPrice = getTotalPrice(state.cartItem);
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
