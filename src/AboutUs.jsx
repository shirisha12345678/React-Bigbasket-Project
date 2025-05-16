// import React from 'react'

// function AboutUs() {
//   return (
//     <>

//     <h1>About us</h1>
//     </>
//   )
// }

// export default AboutUs
import React from 'react';
import './AboutUs.css'; // Optional external CSS

function AboutUs() {
  return (
    <div className="about-container">
      <h1>Welcome to the About Page</h1>
      <p>
        Our website is dedicated to providing the best user experience by offering high-quality content, tools, and services.
        We aim to help our visitors with useful information and engaging features. Whether you're here for the latest news,
        tutorials, or resources, we hope to meet all your needs.
      </p>

      <p>
        Our team is passionate about delivering value and continuously improving our platform. Thank you for visiting, and feel free to explore!
      </p>

      <h2>Our History</h2>
      <p>
        Founded in [Year], we started as a small project with a goal to offer top-notch resources and educational content.
        Over the years, we've expanded our offerings and built a dedicated community that shares our values.
        We are proud of how far we've come and excited for the future.
      </p>

      <h2>Meet the Team</h2>
      <div className="team-list">
        <div className="team-member">
          <strong>Ratan</strong><br />
          Founder & CEO
        </div>
        <div className="team-member">
          <strong>Ramya Naidu</strong><br />
          Head of Content
        </div>
        <div className="team-member">
          <strong>Shirisha Thanugula</strong><br />
          Lead Developer
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
