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
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(true);

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
        variables: {
          username: formState.username,
          password: formState.password,
          isAdmin: isAdmin,
        },
      });
      console.log(mutationResponse.data);
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      setShowEnterButton(false); // Hide the Enter button
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: { username: formState.username, password: formState.password, email: formState.email },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
      setShowEnterButton(false); // Hide the Enter button
    } catch (e) {
      console.log(e);
    }
  };

  const showLogin = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
    setShowEnterButton(false); // Hide the Enter button
  };

  const showSignup = () => {
    setShowLoginForm(false);
    setShowSignupForm(true);
    setShowEnterButton(false); // Hide the Enter button
  };


  return (
    <>
      {showEnterButton && (
        <button className="toggleBtn" onClick={showLogin}>
          Enter
        </button>
      )}
  
      {showLoginForm && (
        <div className="container my-1" id="login-component">
          <form autoComplete="off" className="form-title" onSubmit={handleLoginSubmit}>
            <div className="flex-row space-between my-2">
              <label htmlFor="admin">Admin Login:</label>
              <input
                name="admin"
                type="checkbox"
                id="admin"
                onChange={() => setIsAdmin(!isAdmin)}
              />
            </div>
  
            <div className="flex-row space-between my-2">
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
              <input
                className="input-field"
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
  
            <div id="btn-container" className="flex-row flex-end">
              <button id="signUp-btn" type="submit">
                Login
              </button>
            </div>
          </form>
  
          <div className="toggleContainer">
            <p className="toggleText">Not a member? </p>
            <button className="toggleBtn" onClick={showSignup}>
              Create an Account
            </button>
          </div>
        </div>
      )}
  
      {showSignupForm && (
        <div className="container my-1" id="signup-component">
          <form autoComplete="off" className="form-title" onSubmit={handleSignupSubmit}>
            <div className="flex-row space-between my-2">
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
              <input
                className="input-field"
                placeholder="email@email.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
  
            <div className="flex-row space-between my-2">
              <input
                className="input-field"
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
  
            <div id="btn-container" className="flex-row flex-end">
              <button id="signUp-btn" type="submit">
                Sign up
              </button>
            </div>
          </form>
  
          <div className="toggleContainer">
            <p className="toggleText">Already a member? </p>
            <button className="toggleBtn" onClick={showLogin}>
              Log in
            </button>
          </div>
        </div>
      )}
    </>
  );
  
}