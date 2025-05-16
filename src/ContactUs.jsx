import React, { useState } from 'react';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", { name, email, message });
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      
      <p>We'd love to hear from you! Whether you have a question, suggestion, or concern, feel free to get in touch with us. Our team is always ready to help you with anything related to your orders, delivery, or food preferences.</p>
      
      <h2>Our Address</h2>
      <p>Delicious Delivery HQ<br />123 Food Street, Flavor Town, USA</p>
      
      <h3>Get In Touch</h3>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Your Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Your Message</label>
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactUs;
