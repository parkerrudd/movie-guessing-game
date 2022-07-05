import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const API_BASE = "http://localhost:3004"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const loginUser = async (event) => {
        event.preventDefault()

        const response = await fetch(API_BASE + '/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email, 
                password
            })
        })

        const data = await response.json()

        if (data.user) {
            localStorage.setItem('token', data.user)
            navigate('/homepage')
        } else {
            alert('Please check email and password')
        }
    }

    return (
        <div className="login-container">
        <form onSubmit={loginUser}>
                <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com"/>
                <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login; 