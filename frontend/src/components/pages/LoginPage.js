import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiPost } from '../../apiService';
import '../../App.css'
export default function SignInPage() {
    

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');



    const submitLogin = async () => {
        if (!name) {
            alert("username is  required")

        }
        else if (!password) {
            alert("password is  required")
        }
        else {
            try {
                let res = await apiPost("/login", null, { name,  password })
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
                    <input type="text" name="first_name" onChange={(e) => setName(e.target.value)} />
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
