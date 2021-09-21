import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryApi } from 'api/CategoryApi';
import { feedBackApi } from 'api/feedBackApi';
import { productApi } from 'api/ProductApi';



export const fetchPageInfo = createAsyncThunk('pageInfo/fetchPageInfo', async (params, { fulfillWithValue, rejectWithValue, dispatch }) => {

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

        //handle range 
        dispatch(getRangePrice(getRange(products)))

        return {
            products: products,
            // _page: pageInfo._page,
            // _limit: pageInfo._limit,
            // _totalPage: pageInfo._totalPage
        };

    } catch (error) {
        return rejectWithValue(error);
    }

})


export const sendFeedBack = createAsyncThunk('pageInfo/sendFeedBack', async (data, { rejectWithValue }) => {

    try {
        //check data
        const { message } = await feedBackApi.post(data);
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


const getRange = (books) => {
    let rangeBook = books.sort((a, b) => b.price - a.price).map(book => book.price);
    return rangeBook[0] / 100;
}

const initialState = {
    products: [],
    categories: [],
    loading: false,
    isLoadingFeedBack: false,
    isLoadingCategory: false,
    error: '',
    isNewFeed: false,
    starVoted: 5,
    rangeStep: 0,
    filterPattern: {
        searchValue: '',
        categoryFilter: [],
        rangePrice: [],
        sort: ''
    },

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
        filterBy: (state, action) => {
            state.filterPattern = { ...state.filterPattern, ...action.payload };
        },
        getRangePrice: (state, action) => {
            state.rangeStep = action.payload;

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
export const { changePage, hasNewFeedBack, filterBy, getRangePrice } = actions;

export default reducer;