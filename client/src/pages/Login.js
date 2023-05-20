import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "./Login.css";

export default function Login() {
  const [formState, setFormState] = useState({ username: "", password: "", email: "" });
  const [login, { error }] = useMutation(LOGIN);
  const [addUser] = useMutation(ADD_USER);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await login({
        variables: {
          username: formState.username,
          password: formState.password,
        },
      });
      console.log(data);
      const token = data.login.token;
      const { email } = data.login.user; // Extract the email value from the response data
      Auth.login(token, email); // Pass the email value to Auth.login
      setShowEnterButton(false); // Hide the Enter button

      // Step 1: Check if the token is being set correctly
      console.log(Auth.getToken());

      // Step 4: Test token expiration logic
      const isExpired = Auth.isTokenExpired(token);
      console.log('Token expired:', isExpired);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          username: formState.username,
          password: formState.password,
          email: formState.email,
          isAdmin: isAdmin, 
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token, formState.email); // Pass the email value to Auth.login
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
        <div id="enterdiv">
          <button className="toggleBtn" id="enterBtn" onClick={showLogin}>
            Enter
          </button>
        </div>
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
