import * as yup from 'yup';

const loginSchema = yup.object().shape({
    userName: yup.string()
        .required('This field is requried'),
    passWord: yup.string()
        .required('This field is requried'),
});


export default loginSchema;