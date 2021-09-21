import * as yup from 'yup';

const registerSchema = yup.object().shape({
    name: yup.string()
        .required('This field is requried'),
    phoneNumber: yup.string().matches(/^0[0-9]+$/, "Phone number is invalid")
        .min(10, 'Phone number must have 10 or 11 numbers')
        .max(11, 'Phone number must have 10 or 11 numbers')
        .required('This field is requried'),
    email: yup.string().email()
        .required('This field is requried'),
    userName: yup.string()
        .required('This field is requried'),
    passWord: yup.string()
        .required('This field is requried'),
    tryPassWord: yup.string().oneOf([yup.ref('passWord'), null], "Passwords don't match ")
        .required('This field is requried'),
    address: yup.string()
        .required('This field is requried'),
});


export const defaultValues = {
    name: '',
    phoneNumber: '',
    email: '',
    userName: '',
    passWord: '',
    tryPassWord: '',
    address: ''
}

export default registerSchema;