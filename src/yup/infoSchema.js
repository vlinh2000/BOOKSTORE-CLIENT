import * as yup from 'yup';

const infoSchema = yup.object().shape({
    name: yup.string()
        .required('This field is requried'),
    phoneNumber: yup.string().matches(/^0[0-9]+$/, "Phone number is invalid")
        .min(10, 'Phone number must have 10 or 11 numbers')
        .max(11, 'Phone number must have 10 or 11 numbers')
        .required('This field is requried'),
    address: yup.string()
        .required('This field is requried'),
}).strict();


export default infoSchema;