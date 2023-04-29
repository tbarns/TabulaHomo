import Login from './Login'
import Signup from './Signup'
import './Home.css';

export default function Home() {

  return (

    <>
      <div className="container" id="test">
      <div className="box">
        <br></br>
        <Login className="login"  />
        <br></br>
        <Signup className="signup" />
        <br></br>
        </div>
      </div>

    </>

  )
}

