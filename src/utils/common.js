import { ICON_BYE, ICON_ERR, ICON_HI, TOAST_CONFIG } from "constants/Global";
import { toast } from 'react-toastify';

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

export const toastSuccess = (message, action) => {
    let icon;
    switch (action) {
        case "HI": icon = () => <img alt="hi" width="25px" height="25px" src={ICON_HI} />; break;
        case "BYE": icon = () => <img alt="bye" width="25px" height="25px" src={ICON_BYE} />; break;
        default: icon = "🚀";
    }

    toast.success(message, { ...TOAST_CONFIG, icon });
}

export const toastError = message => {
    toast.error(message, { ...TOAST_CONFIG, icon: () => <img width="25px" height="25px" alt="error" src={ICON_ERR} /> });
}




