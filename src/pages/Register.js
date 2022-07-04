import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3004"

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const registerUser = async (event) => {
        event.preventDefault()

        const response = await fetch(API_BASE + "/register", {
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

        if (data.status === 'ok') {
            navigate('/login')
        } else {
            alert(data.error)
        }

    }

    return (    
        <div className="register-container">
            <form onSubmit={registerUser}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
                <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com"/>
                <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    )
}

export default Register; 