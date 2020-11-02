import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import SearchBar from './SearchBar';
import { baseUrl } from './config';
import { TOKEN_KEY, setUserName, setAvatarURL, setToken } from './store/authentication';
import { Redirect } from 'react-router-dom';

const SignUp = (props) => {
    const [token, setUserToken] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [avatarURL, setLocalAvatarURL] = useState('');

    const defaultAvatar = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}/users/`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, emailAddress, password, confirmPassword, avatarURL }),
          });
          console.log("Sent signup request with user: ", emailAddress, " and password: ", password);
          if (response.ok) {
            const { token, user } = await response.json();
            window.localStorage.setItem(TOKEN_KEY, token);
            dispatch(setToken(token));
            console.log("User name:  ", user.name);
            dispatch(setUserName(user.name.split(" ")[0]));
            if (avatarURL === '') {
                dispatch(setAvatarURL(defaultAvatar));
            } else {
                dispatch(setAvatarURL(avatarURL));
            }
            setUserToken(token);
          }
    }

    const updateName = (e) => {
        setName(e.target.value);
    }

    const updateConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const updateEmailAddress = (e) => {
        setEmailAddress(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateAvatarURL = (e) => {
        setLocalAvatarURL(e.target.value);
    }

    if (token) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <SearchBar></SearchBar>
            <form className="signUpForm" onSubmit={handleSubmit}>
                <div className="signUpInput">
	                <div className="signUpLabel">
		                <label>Name </label>
	                </div>
                    <input
                        className="inputBox"
                        type="text"
                        placeholder="First and Last Name"
                        value={name}
                        onChange={updateName}
                    />
                </div>
                <div className="signUpInput">
	                <div className="signUpLabel">
		                <label>Email:</label>
	                </div>
                    <input
                        className="inputBox"
                        type="email"
                        placeholder="Email address"
                        value={emailAddress}
                        onChange={updateEmailAddress}
                    />
                </div>
                <div className="signUpInput">
	                <div className="signUpLabel">
		                <label>Avatar URL</label>
	                </div>
                    <input
                        className="inputBox"
                        type="text"
                        placeholder="Avatar URL (optional)"
                        value={avatarURL}
                        onChange={updateAvatarURL}
                    />
                </div>
                <div className="signUpInput">
	                <div className="signUpLabel">
		                <label>Password:</label>
	                </div>
                    <input
                        className="inputBox"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={updatePassword}
                    />
                </div>
                <div className="signUpInput">
	                <div className="signUpLabel">
		                <label>Confirm Password:</label>
	                </div>
                    <input
                        className="inputBox"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={updateConfirmPassword}
                    />
                </div>
                <button type="submit">Sign Up</button>
                </form>
            </div>

    )
}
export default SignUp;
