import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {  apiPost } from '../../apiService';

import '../../App.css'

export default function SignUpPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const submitSingup = async () => {
        if (!name) {
            alert("username is  required")

        }
        else if (!email) {
            alert("email is  required")


        }
        else if (!password) {
            alert("password is  required")


        }

        else {
            alert("success full")

            try {
                let res = await apiPost("/register", null, { name, email, password })
                if (res.success) {

                    alert(res.message)
                    window.history.pushState(null, null, window.location.href);
                    window.location.replace("/");

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
            <h5>Create your personal account</h5>
            <div className='form' >
                <p>
                    <label>Username</label><br />
                    <input type="text" name="first_name" onChange={(e) => setName(e.target.value)} />
                </p>
                <p>
                    <label>Email address</label><br />
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                </p>
                <p>
                    <label>Password</label><br />
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </p>

                <p>
                    <div id="sub_btn" type="submit" onClick={() => submitSingup()}>Register</div>
                </p>
            </div>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
