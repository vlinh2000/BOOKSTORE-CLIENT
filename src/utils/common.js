//hanlde get voted star highest 
export const getVotedHighest = (feedBack) => {
    //feedBack : {
    // _id
    // bookId
    // comments:[]  }
    let cloneFeedBack = [...feedBack?.comments];
    cloneFeedBack = cloneFeedBack.sort((a, b) => b.voted - a.voted);
    return cloneFeedBack[0].voted;

}

//handle sort 
export const handleSort = (products, values) => {
    switch (values) {
        case 'min-to-max': return products.sort((book1, book2) => book1.price - book2.price);
        case 'max-to-min': return products.sort((book1, book2) => book2.price - book1.price);
        default: return products;
    }

}