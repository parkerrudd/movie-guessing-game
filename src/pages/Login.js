import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Letters from "./letters";
import styles from '../styles/styles.css'

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
            <form className="login-form" onSubmit={loginUser}>
                <div><h1>The</h1></div>
                <Letters />
                <h1>Game</h1>
                <input className="login-inputs" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com"/>
                <input className="login-inputs" value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <input className="login-btn" type="submit" value="Login" />

                <div>Don't have an account yet? <a href="/register">Sign Up!</a></div>
            </form>
        </div>
    )
}

export default Login; 