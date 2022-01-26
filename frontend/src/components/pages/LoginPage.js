import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { apiPost } from '../../apiService';
import { Link } from 'react-router-dom';
import '../../../src/login.css';


export default function Signin() {
    const validate = Yup.object({

        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is required'),

    })
    return (<>
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

                <>

                    <section class="h-100" style={{margin:'50px'}}>
                        <div class="container h-100">
                            <div class="row justify-content-md-center h-100">
                                <div class="card-wrapper">
                                    <div class="brand">
                                        {/* <img src="img/logo.jpg" alt="logo"> */}
                                    </div>
                                    <div class="card fat mt-3">
                                        <div class="card-body">
                                            <h4 class="card-title">Sign in</h4>
                                            <Form class="my-login-validation">
                                                <div class="form-group">
                                                    <TextField label="Email" name="email" type="email" />
                                                </div>

                                                <div class="form-group">

                                                    <TextField label="password" name="password" type="password" />

                                                </div>


                                                <div class="mt-4 text-center">
                                                    Don't have an account?  <Link to='/register'> Create One ?</Link>
                                                </div>

                                                <div class="form-group m-0">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <button className="btn btn-dark mt-3" type="submit">Login</button>
                                                        <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                                                    </div>
                                                </div>

                                            </Form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </Formik>


    </>
    )
}

