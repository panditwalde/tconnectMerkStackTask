import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { apiPost } from '../apiService';
import { Link } from 'react-router-dom';
import loginImg from "../login.svg";

export default function Register() {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  })
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={values => {

        const { firstName, lastName, email, password } = values;




        apiPost("/register", null, { name: `${firstName} ${lastName}`, email, password }).then((res) => {

          if (res.success) {

            alert(res.message)
            window.history.pushState(null, null, window.location.href);
            window.location.replace("/");
          }
          else {
            alert(res.message)
          }
        }).catch((e) => {
          alert("something went wrong!!")
        })
      }}
    >
      {formik => (<>





        <div className="App">
          <div className="login">
            <div className="container" >
              <div className="base-container" >
                <div className="header">Register</div>
                <div className="content">
                  <div className="image">
                    <img src={loginImg} />
                  </div>

                  <Form className="form">
                    <div className="form-group">
                      <TextField label="First Name" name="firstName" type="text" />
                    </div>
                    <div className="form-group">
                      <TextField label="last Name" name="lastName" type="text" />
                    </div>

                    <div class="form-group">
                      <TextField label="Email" name="email" type="email" />
                    </div>

                    <div class="form-group">
                      <TextField label="password" name="password" type="password" />
                    </div>

                    <div class="form-group">

                      <TextField label="Confirm Password" name="confirmPassword" type="password" />

                    </div>


                    <div class="mt-4 text-center">
                      <Link to='/'>  already registered?</Link>
                    </div>

                    <div class="footer">
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button className="btn btn-dark mt-3" type="submit">Register</button>
                        <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                      </div>
                    </div>

                  </Form>

                </div>

              </div>
            </div>  </div>  </div>
        );


      </>
      )}
    </Formik>
  )
}


