import React from 'react';
import SearchBar from './SearchBar';

const LogInOrSignUp = ({props}) => {

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Handle login ...");
        window.location.href = '/users/login';
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log("Handle signIn...");
        window.location.href = '/users/signup';
    }

    return(
        <>
            <SearchBar></SearchBar>
            <div className="centerDiv" >
                <form className="loginOrSignUp" >
                    <h3>Already have an account? </h3>
                    <button id="login" onClick={handleLogin}>Login</button>

                    <h3>Sign up?</h3>
                    <button id="signUp" onClick={handleSignUp}>SignUp</button>
                </form>
            </div>

        </>
    )
};


export default LogInOrSignUp;
