import { TextField } from "./TextField";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { apiPost } from "../apiService";
import "./style.css";

const App = () => {

    const validate = Yup.object({
        userName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('userName is Required'),

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

    const inputs = [
        { label: "userName", name: "userName", type: "text" },
        { label: "email", name: "email", type: "email" },
        { label: "password", name: "password", type: "password" },
        { label: "Confirm Password", name: "confirmPassword", type: "password" },
    ];

    return (

        <div className="app">

            <Formik
                initialValues={{
                    userName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={validate}
                onSubmit={values => {

                    const { userName, email, password } = values;

                    apiPost("/register", null, { name: userName, email, password }).then((res) => {

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

                    <Form >
                        <h1>Register</h1>
                        {
                            inputs.map((row, index) =>
                                <TextField key={index} label={row.label} name={row.name} type={row.type} />
                            )
                        }
                        <div class="mt-4 text-center">
                            <Link to='/'>  already registered?</Link>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type="submit">Register</button>
                            <button type="reset">Reset</button>
                        </div>
                    </Form>
                </>
                )}
            </Formik>
        </div>

    );
};

export default App;
