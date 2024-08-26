import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faSnapchat } from '@fortawesome/free-brands-svg-icons';
import './About.css'; // Ensure this file exists for additional styling

const About = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>Welcome to <strong>Mjay Poetry</strong>, a space dedicated to the art of shayari. This platform is a reflection of my passion for poetry and my desire to share it with the world.</p>
      <p>My name is <strong>Mrityunjay Bhardwaj</strong>, and I have always been captivated by the beauty of words and emotions. Through Mjay Poetry, I aim to create a sanctuary where words weave magic and emotions find a voice.</p>
      <p>Here, you will find a collection of my shayari that explores various themes – love, life, and reflections. Each piece is crafted with care and a touch of personal experience, hoping to resonate with your feelings and thoughts.</p>
      <p>Feel free to browse through the gallery of shayaris, and I hope you find something that speaks to you. Whether it's a moment of joy or contemplation, my poetry is here to accompany you.</p>
      <p>Thank you for visiting Mjay Poetry. Your presence means a lot, and I hope you enjoy the journey through words and emotions.</p>
      <div className="mj-container">
        <p className="mj-text">Mjay</p>
      </div>
      <div className="social-media-icons">
        <a href="https://www.facebook.com/mrityunjay2864" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://twitter.com/im_mjay_0" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://www.instagram.com/mjay._0" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://www.linkedin.com/in/mrityunjay-bhardwaj-38012a1b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a href="https://www.snapchat.com/add/imjay_05" target="_blank" rel="noopener noreferrer" aria-label="Snapchat">
          <FontAwesomeIcon icon={faSnapchat} size="2x" />
        </a>
      </div>
    </div>
  );
};

export default About;
