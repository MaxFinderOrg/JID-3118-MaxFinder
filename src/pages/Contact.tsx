// ContactUsPage.js

import React from 'react';
import ContactUsForm from './ContactUsForm';

const ContactUs = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Contact Us</h1>
      <h6>Need to get in touch with us?</h6>
      <h6>Fill out the form to contact us</h6>
      <ContactUsForm />
    </div>
  );
};

export default ContactUs;
