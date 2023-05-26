import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import './MailchimpSignupForm.css'; // Import your custom CSS file

const SUBSCRIBE_EMAIL = gql`
  mutation SubscribeEmail($email: String!) {
    subscribeEmail(email: $email) {
      success
      message
    }
  }
`;

const MailchimpSignupForm = ({ alert }) => {
  const [email, setEmail] = useState('');
  const [subscribeEmail] = useMutation(SUBSCRIBE_EMAIL);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await subscribeEmail({ variables: { email } });

      if (data.subscribeEmail.success) {
        // Email subscription successful
        alert.success('Email subscribed successfully');
        // Reset the email input field
        setEmail('');
      } else {
        // Handle any errors or display an error message
        alert.error('Email subscription failed: ' + data.subscribeEmail.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert.error('An error occurred while subscribing');
    }
  };

  return (
    <div id="mc_embed_signup">
      <form onSubmit={handleSubmit} className="mailchimp-form">
        {/* Form fields and content */}
        {/* ... */}

        {/* Email input */}
        <div className="mc-field-group">
          <label htmlFor="mce-EMAIL" className="form-label">
            Email: 
          </label>
          <input
            type="email"
            value={email}
            name="EMAIL"
            className="form-input"
            id="mce-EMAIL"
            required
            onChange={handleEmailChange}
          />
          <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
        </div>

        {/* Submit button */}
        <div className="optionalParent">
          <div className="clear foot">
            <input
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="submit-button"
            />
            {/* Mailchimp branding */}
            <p className="brandingLogo">
              <a href="http://eepurl.com/ir0-IQ" title="Mailchimp - email marketing made easy and fun">
                <img
                  src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"
                  alt="Mailchimp"
                  className="brandingLogo-image"
                />
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MailchimpSignupForm;
