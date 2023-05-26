import React from 'react';
import { useAlert } from 'react-alert';
import MailchimpSignupForm from '../components/MailchimpSignupForm';

const Connect = () => {
  const alert = useAlert();

  return (
    <div>
      <MailchimpSignupForm alert={alert} />
    </div>
  );
};

export default Connect;
