import React from 'react'
import './Login.css'

const Login = () => {
    return (
        <div>
            <div className="login-container">
                <h2 className="login-title">Log in </h2>
                <div className="loginform">
                    <input className='login-input' type="text" placeholder="Enter your email"/><br />
                    <input className='login-input' type="password" placeholder="Password"/><br />
                    <button className='login-button'>Log In</button><br />
                    <a href='#' className='forgot-password'>Forgot Password</a>
                </div>
                <div className="social-login">
                    <button className='google-button'>Google</button><br />
                    <button className='facebook-button '>Facebook</button><br />
                
                </div>
                <div className="login-footer">
                    <a href='#' className='Signup'>New on gameHost ? Sign up</a>
                </div>
            </div>
        </div>
    )
}

export default Login
