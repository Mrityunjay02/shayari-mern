import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faSnapchat, faPinterest, faThreads } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  React.useEffect(() => {
    // Add Playfair Display font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="about-container">
      <div className="title-container">
        <h1 className="about-title">About Me</h1>
        <div className="title-underline"></div>
      </div>
      
      <div className="about-content">
        <p>Welcome to <span className="highlight">Mjay Poetry</span>, where words come alive, emotions find a voice, and the essence of shayari touches the soul.</p>
        
        <p>My name is <span className="highlight">Mrityunjay Bhardwaj</span>, and I have always been captivated by the beauty of words and emotions. My journey with poetry began as a deep love for words and the emotions they carry, evolving into this platform where I share my thoughts with the world.</p>
        
        <p>Through Mjay Poetry, I aim to create a sanctuary where words weave magic, emotions take flight, and every verse tells a story.</p>
        
        <p>Here, you will find a collection of my shayari that explores various themes—love, life, and reflections. Each piece is crafted with care and a touch of personal experience, hoping to resonate with your feelings and thoughts.</p>
        
        <p>Feel free to browse through the gallery of shayaris, and I hope you find something that speaks to you. Whether it's a moment of joy or contemplation, my poetry is here to accompany you.</p>
        
        <p>Thank you for visiting Mjay Poetry. Your presence means a lot, and I hope you enjoy the journey through words and emotions. Let's embark on this poetic journey together, where every verse has a story and every word resonates with the heart.</p>
      </div>

      <div className="signature-section">
        <div className="signature">Mrityunjay Bhardwaj</div>
      </div>

      <div className="social-links">
        <a href="https://instagram.com/mrityunjay2864" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="instagram-icon" />
        </a>
        <a href="https://twitter.com/mrityunjay2864" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} className="twitter-icon" />
        </a>
        <a href="https://www.linkedin.com/in/mrityunjay-bhardwaj-8b4a04220" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="linkedin-icon" />
        </a>
        <a href="https://www.snapchat.com/add/mrityunjay2864" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faSnapchat} className="snapchat-icon" />
        </a>
        <a href="mailto:mjay.bhardwaj02@gmail.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
        </a>
        <a href="https://www.pinterest.com/mrityunjay2864" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faPinterest} className="pinterest-icon" />
        </a>
        <a href="https://www.threads.net/@mrityunjay2864" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faThreads} className="threads-icon" />
        </a>
      </div>
    </div>
  );
};

export default About;
