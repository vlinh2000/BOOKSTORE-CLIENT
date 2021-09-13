import { continueStatement } from '@babel/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryApi } from 'api/CategoryApi';
import { feedBackApi } from 'api/feedBackApi';
import { productApi } from 'api/ProductApi';



export const fetchPageInfo = createAsyncThunk('pageInfo/fetchPageInfo', async (params, { fulfillWithValue, rejectWithValue }) => {

    try {
        const pageInfo = await productApi.getAll(params);
        //handle get feedback 
        const { feedBack } = await feedBackApi.getAll(); //{ message: {...} , feedBack:{...} }
        //map into products to easy to render
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


export const sendFeedBack = createAsyncThunk('pageInfo/sendFeedBack', async (data, { rejectWithValue }) => {

    try {
        //check data
        const { message } = await feedBackApi.post(data);
        console.log(message);
        return message;
    } catch (error) {
        return rejectWithValue(error);
    }


});


export const fetchCategory = createAsyncThunk('pageInfo/fetchCategory', async (params, { rejectWithValue }) => {

    try {
        const { categories } = await categoryApi.getAll();
        return categories;
    } catch (error) {
        return rejectWithValue(error);
    }

});

const initialState = {
    products: [],
    categories: [],
    // _page: 1,
    // _limit: 8,
    // _totalPage: 2,
    loading: false,
    isLoadingFeedBack: false,
    isLoadingCategory: false,
    error: '',
    isNewFeed: false,
    starVoted: 5,
    search: { category: '-1', value: '' },

}


const pageInfo = createSlice({
    name: 'pageInfo',
    initialState,
    reducers: {
        changePage: (state, action) => {
            state._page = action.payload;
        },
        hasNewFeedBack: (state, action) => {
            state.isNewFeed = !state.isNewFeed;
        },
        searchValue: (state, action) => {
            state.search = action.payload;
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
            // state._limit = action.payload._limit;
            // state._page = action.payload._page;
            // state._totalPage = action.payload._totalPage;


        },
        [fetchPageInfo.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        //handle send feed back 
        [sendFeedBack.pending]: (state) => {
            state.isLoadingFeedBack = true;
        },
        [sendFeedBack.fulfilled]: (state, action) => {
            state.isLoadingFeedBack = false;
            state.starVoted = action.meta.arg.voted;
        },
        [sendFeedBack.rejected]: (state, action) => {
            state.isLoadingFeedBack = false;
            state.error = action.error;
        },
        //handle send feed category 
        [fetchCategory.pending]: (state) => {
            state.isLoadingCategory = true;
        },
        [fetchCategory.fulfilled]: (state, action) => {
            state.isLoadingCategory = false;
            state.categories = action.payload
        },
        [fetchCategory.rejected]: (state, action) => {
            state.isLoadingCategory = false;
            state.error = action.error;
        },
    }
})

const { actions, reducer } = pageInfo;
export const { changePage, hasNewFeedBack, searchValue } = actions;

export default reducer;