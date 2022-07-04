import React, { useState } from "react";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (event) => {
        event.preventDefault()

        
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