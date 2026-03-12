import * as Yup from 'yup';


export const initialValues = {
    signup: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        imageUrl: '',
    },

    login: {
        email: '',
        password: ''
    }
};

export const validationSchema = {
    signup: Yup.object({
        email: Yup.string().email('Enter a valid email').required('Email is required'),
        name: Yup.string().required('Name is required'),
        password: Yup.string().length(6, 'Password must be minimum 6 characters long').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Password is required'),
    }),

    login: Yup.object({
        email: Yup.string().email('Enter a valid email').required('Email is required'),
        password: Yup.string().length(6, 'Password must be minimum 6 characters long').required('Password is required'),
    })
}