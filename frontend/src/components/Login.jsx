import { TextField } from "./TextField";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { apiPost } from "../apiService";
import "./style.css";
 
const App = () => {


    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is required'),

    })


    const inputs = [
        { name: "Email", type: "email", label: "email" },
        { name: "password", type: "password", label: "Password" },

    ];


    return (

        <div className="app">

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

                    <Form >
                        <h1>Login</h1>
                        {
                            inputs.map((row, index) =>
                                <TextField key={index} label={row.label} name={row.name} type={row.type} />
                            )
                        }

                        <div class="mt-4 text-center">
                            <Link to='/register'>  new user?</Link>
                        </div>


                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type="submit">Login</button>
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
