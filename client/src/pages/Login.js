import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "./Login.css";

export default function Login(props) {
    const [formState, setFormState] = useState({ username: "", password: "" });
    const [login, error] = useMutation(LOGIN);
    const [addUser] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { username: formState.username, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await addUser({
                variables: { username: formState.username, password: formState.password },
            });
            const token = mutationResponse.data.signup.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const showLogin = () => {
        document.querySelector("#login-component").style.display = "block";
        document.querySelector("#signup-component").style.display = "none";
    };

    const showSignup = () => {
        document.querySelector("#login-component").style.display = "none";
        document.querySelector("#signup-component").style.display = "block";
    };

    return (
        <>
            <div className="container my-1" id="login-component">
                <button onClick={showSignup}>Sign Up</button>
                <form autoComplete="off" className="form-title" onSubmit={handleLoginSubmit}>
                    Login
                    <div className="flex-row space-between my-2">
                        <label htmlFor="username">Username:</label>
                        <input
                            className="input-field"
                            placeholder="Enter Username"
                            name="username"
                            type="username"
                            id="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="pwd">Password:</label>
                        <input
                            className="input-field"
                            placeholder="******"
                            name="password"
                            type="password"
                            id="pwd"
                            onChange={handleChange}
                        />
                    </div>
                    {error ? <p className="error-text">The provided credentials are incorrect</p> : null}
                    <div id="btn-container" className="flex-row flex-end">
                        <button id="login-btn" type="submit">
                            Log in
                        </button>
                    </div>
                </form>
            </div>

            <div className="container my-1" id="signup-component" style={{ display: "none" }}>
                <button onClick={showLogin}>Log in</button>
                <form autoComplete="off" className="form-title" onSubmit={handleSignupSubmit}>
                    Sign Up
                    <div className="flex-row space-between my-2">
                        <label htmlFor="username">Username:</label>
            </div> 
                </form>
                </div >
                </>
  );
}