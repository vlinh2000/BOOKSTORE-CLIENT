import * as yup from 'yup';

const feedBackSchema = yup.object().shape({
    message: yup.string()
        .required('This field is requried'),
    voted: yup.number().required('Please vote your raiting !').typeError("Please vote your raiting !")
});


export default feedBackSchema;