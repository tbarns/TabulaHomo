import { Link } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import { useState } from "react";
import Auth from "../utils/auth";

export default function Profile() {
  const [query, setQuery] = useState("")

  return (
    <>
      {Auth.loggedIn() ? (
        <div>
          <br></br>
          <div>
            <UserInfo />
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
