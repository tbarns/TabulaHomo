import React from 'react';
import { useAlert } from 'react-alert';
import MailchimpSignupForm from '../components/MailchimpSignupForm';
import './Connect.css'
const Connect = () => {
  const alert = useAlert();

  return (
    <div className='connectContainer'>
      <div id = 'newsletterInfo'>

      <p>
        Not receiving the Tabula Homo newsletter? Get signed up for all the latest updates and offerings.
      </p>
      </div>
      <MailchimpSignupForm alert={alert} />
    </div>
  );
};

export default Connect;
