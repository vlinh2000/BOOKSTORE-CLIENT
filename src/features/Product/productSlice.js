import { continueStatement } from '@babel/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { feedBackApi } from 'api/feedBackApi';
import { productApi } from 'api/ProductApi';



export const fetchPageInfo = createAsyncThunk('pageInfo/fetchPageInfo', async (params, { fulfillWithValue, rejectWithValue }) => {

    try {
        const pageInfo = await productApi.getAll(params);
        console.log(pageInfo);
        //handle get feedback 
        const { feedBack } = await feedBackApi.getAll(); //{ message: {...} , feedBack:{...} }
        //map into products to easy to render
        console.log(feedBack);
        const products = pageInfo.books.map(book => {
            //find --  does book have feedBack?    
            const feedBackOfThisBook = feedBack.find(item => item.bookId === book._id);
            return { ...book, feedBack: feedBackOfThisBook };
        })


        return {
            products: products,
            _page: pageInfo._page,
            _limit: pageInfo._limit,
            _totalPage: pageInfo._totalPage
        };

    } catch (error) {
        return rejectWithValue(error);
    }

})

// //handle get book by book id
// export const fetchBook = createAsyncThunk('pageInfo/fetchProduct', async (bookId, { fulfillWithValue, rejectWithValue }) => {
//     try {
//         const book = await productApi.get(bookId);
//         return fulfillWithValue(book);

//     } catch (error) {
//         return rejectWithValue(error);
//     }

// });


const initialState = {
    products: [],
    _page: 1,
    _limit: 8,
    _totalPage: 2,
    loading: false,
    error: ''
}


const pageInfo = createSlice({
    name: 'pageInfo',
    initialState,
    reducers: {
        changePage: (state, action) => {
            state._page = action.payload;
        }

    },
    extraReducers: {
        //handle get page infomation 
        [fetchPageInfo.pending]: (state) => {
            state.loading = true;
        },
        [fetchPageInfo.fulfilled]: (state, action) => {

            state.loading = false;
            state.products = action.payload.products;
            state._limit = action.payload._limit;
            state._page = action.payload._page;
            state._totalPage = action.payload._totalPage;


        },
        [fetchPageInfo.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
    }
})

const { actions, reducer } = pageInfo;
export const { changePage } = actions;

export default reducer;