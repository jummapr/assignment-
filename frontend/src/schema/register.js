import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    location: yup.string().required()
})