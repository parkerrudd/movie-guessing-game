import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/styles.css'
import Letters from "./letters";

const API_BASE = process.env.PORT

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const registerUser = async (event) => {
        event.preventDefault()

        const response = await fetch("https://nameless-ocean-24440.herokuapp.com/api/register", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                name, 
                email, 
                password
            })
        })

        const data = await response.json()
        console.log(data)
        if (data.status === 'ok') {
            navigate('/')
        } else {
            alert(data.error)
        }

    }

    return (    
        <div className="register-container">
            <form className="register-form" onSubmit={registerUser}>
                <h1>The</h1>
                <Letters />
                <h1>Game</h1>
                <input className="register-inputs" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
                <input className="register-inputs" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com"/>
                <input className="register-inputs" value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <input className="register-btn" type="submit" value="Sign Up" />
            </form>
        </div>
    )
}

export default Register; 