import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiPost } from '../../apiService';
import '../../App.css'
export default function SignInPage() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const submitLogin = async () => {
        if (!email) {
            alert("email is  required")

        }

        else if (email  && /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i.test(email) === false) {
            alert("Please enter proper email address")

        }

        else if (!password) {
            alert("password is  required")
        }


        else {
            try {
                let res = await apiPost("/login", null, { email, password })
                if (res.success) {
                    alert(res.message)
                    window.history.pushState(null, null, window.location.href);
                    window.location.replace("/home");

                }
                else {
                    alert(res.message)
                }

            } catch (error) {
                alert("something went wrong!!")


            }



        }

    }
    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <div className='form' >
                <p>
                    <label>Username or email address</label><br />
                    <input type="text" name="enter email" onChange={(e) => setEmail(e.target.value)} />
                </p>
                <p>
                    <label>Password</label>
                    <br />
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </p>
                <p>
                    <div id="sub_btn" onClick={() => submitLogin()}>Login</div>
                </p>
            </div>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
            </footer>
        </div>
    )
}
