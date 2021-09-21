import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { billApi } from 'api/BillApi';




export const Checkout = createAsyncThunk("cart/Checkout", async (data, { rejectWithValue }) => {

    try {
        const resData = await billApi.post(data);
        return resData;

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})




const getTotalPrice = (cartItem) => {
    return cartItem.reduce((a, b) => a + b.subTotal, 0).toFixed(2);
}

const initialState = {
    cartItem: [],
    totalPrice: 0,
    itemLiked: [],
    isCheckOutStatus: false
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
        }
    },
    extraReducers: {
        //handle check out
        [Checkout.pending]: (state) => {
            state.isCheckOutStatus = true;
        },
        [Checkout.fulfilled]: (state) => {
            state.cartItem = [];
            state.totalPrice = 0;
            state.isCheckOutStatus = false;
        },
        [Checkout.rejected]: (state) => {
            state.isCheckOutStatus = false;
        },

    }
})

const { actions, reducer } = cart;
export const { addToCart, removeItemInCart, updateCart, likedList } = actions;
export default reducer;
