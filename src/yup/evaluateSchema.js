import * as yup from 'yup';

const evaluateSchema = yup.object().shape({
    message: yup.string()
        .required('This field is requried'),
    voted: yup.number().required('Please vote this book !')
});


export default evaluateSchema;