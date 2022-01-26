// import { Link } from 'react-router-dom'



import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { apiPost } from '../../apiService';
export default function Signin() {
    const validate = Yup.object({

        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is required'),

    })
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validate}
            onSubmit={values => {
                const { email, password } = values;


                apiPost("/login", null, { email, password }).then((res) => {

                    if (res.success) {

                        alert(res.message)
                        window.history.pushState(null, null, window.location.href);
                        window.location.replace("/home");

                    }
                    else {
                        alert(res.message)
                    }
                }).catch((e) => {
                    alert("something went wrong!!")
                })
            }}
        >
            {formik => (
                <div>
                    <h1 className="my-4 font-weight-bold .display-4">Sign in</h1>
                    <Form>
                        <TextField label="Email" name="email" type="email" />
                        <TextField label="password" name="password" type="password" />
                        <button className="btn btn-dark mt-3" type="submit">Login</button>
                        <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

