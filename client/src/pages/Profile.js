import { Link } from "react-router-dom";
import { useState } from "react";
import Auth from "../utils/auth";
import "./Profile.css";
import Logout from "../components/Logout";
export default function Profile() {
  const [query, setQuery] = useState("")

  return (
    <>
      {Auth.loggedIn() ? (
        <div className="temp">
          <Logout/>
          <br></br>
          <div id="landingPage">
       <p >user landing page</p>
          </div>
          <div>
         
          </div>

        </div>


      ) : (
        <p>
          You need to be logged in to view exercises. Please{' '}
          <Link to="/">login</Link>
        </p>


      )}
    </>
  );
}
