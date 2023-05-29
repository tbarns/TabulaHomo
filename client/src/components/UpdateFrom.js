// import React, { useState } from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_USER } from '../utils/queries';
// import UpdateEventForm from '../components/UpdateEventForm';
// import UpdateArtistForm from '../components/UpdateArtistForm';
// import UpdateMerchForm from '../components/UpdateMerchForm';

// const Profile = () => {
//   const [formAlert, setFormAlert] = useState(null);
//   const [showAlert, setShowAlert] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showArtistForm, setShowArtistForm] = useState(false);
//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const { loading, data } = useQuery(GET_USER);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const user = data?.getUser;
//   const userEmail = user?.email;
//   const artistId = /* Get the artist ID from the page */;
//   const eventId = /* Get the event ID from the page */;
//   const merchId = /* Get the merch ID from the page */;

//   const handleEventSubmit = (event) => {
//     console.log(event);
//     // Here you could add more logic to handle the event data if needed
//   };

//   return (
//     <>
//       {Auth.loggedIn() ? (
//         <div>
//           <h2>Create Event</h2>
//           {showAlert && (
//             <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
//               {formAlert}
//             </Alert>
//           )}
//           <div className="temp">
//             <Logout />
//             <button onClick={() => setShowArtistForm(!showArtistForm)}>Upload Artist</button>
//             {showAlert && (
//               <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
//                 {formAlert}
//               </Alert>
//             )}
//             {showArtistForm && artistId && (
//               <UpdateArtistForm artistId={artistId} />
//             )}
//             <button onClick={() => setShowUploadForm(!showUploadForm)}>Upload Images</button>
//             {showUploadForm && <ImageUploadForm />}
//             <button id="toggleCal" onClick={() => setShowCalendar(!showCalendar)}>
//               Toggle Calendar
//             </button>
//             {showCalendar && <EventCalendar />}
//             {eventId && (
//               <UpdateEventForm eventId={eventId} onSubmit={handleEventSubmit} />
//             )}
//             {merchId && (
//               <UpdateMerchForm merchId={merchId} />
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>
//           You need to be logged in. Please <Link to="/">login</Link>.
//         </p>
//       )}
//     </>
//   );
// };

// export default Profile;
