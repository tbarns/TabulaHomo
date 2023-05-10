import EventCalendar from '../components/EventCalendar'
import Login from './Login'



export default function Home() {

  return (

    <>
      <div className="container" id="test">
        <br></br>
        <Login />
        <br></br>

        <br></br>
      </div>
      <div> <EventCalendar />
      </div>
    </>

  )
}

