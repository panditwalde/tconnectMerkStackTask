


import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { apiPost } from '../apiService';
import { Link } from 'react-router-dom';
import loginImg from "../login.svg";


export default function Login() {
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

          <div className="App">
            <div className="login">
              <div className="container" >
                <div className="base-container" >
                  <div className="header">Login</div>
                  <div className="content">
                    <div className="image">
                      <img src={loginImg} />
                    </div>
                    <Form className="form">
                      <div className="form-group">
                        <TextField label="Email" name="email" type="email" />

                      </div>
                      <div className="form-group">
                        <TextField label="password" name="password" type="password" />

                      </div>
                      <div className="footer" style={{ display: 'flex', justifyContent: 'space-between' }}>

                        <button className="btn btn-dark mt-3" type="submit">Login</button>
                        <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                      </div>
                    </Form>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Formik>


  </>
  )
}
