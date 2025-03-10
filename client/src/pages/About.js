import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faSnapchat, faPinterest, faThreads } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  React.useEffect(() => {
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
      <div className="about-header">
        <h1 className="about-title">About Me</h1>
        <div className="title-underline"></div>
      </div>
      
      <div className="about-content">
        <div className="quote-icon left">
          <FontAwesomeIcon icon={faQuoteLeft} />
        </div>
        
        <div className="content-text">
          <p>Welcome to <span className="highlight">Mjay Poetry</span>, where words come alive and emotions find their true expression.</p>
          
          <p>I'm <span className="highlight">Mrityunjay Bhardwaj</span>, a passionate writer who believes in the power of words to touch hearts and transform lives. My journey with poetry began as a deep love for expressing emotions through carefully crafted verses.</p>
          
          <p>Through Mjay Poetry, I've created a space where every shayari is more than just words—it's an experience, a feeling, a moment captured in time. Here, you'll find pieces that speak of love, life, hope, and the countless emotions that make us human.</p>
          
          <p>Each shayari is crafted with care, drawing inspiration from life's beautiful moments and deep contemplations. Whether you're seeking solace, celebration, or simply a moment of reflection, I hope these verses resonate with your heart.</p>
          
          <p>Join me in this poetic journey where every word has meaning, every verse tells a story, and every shayari touches the soul. Your presence here makes this journey more meaningful.</p>
        </div>

        <div className="quote-icon right">
          <FontAwesomeIcon icon={faQuoteRight} />
        </div>
      </div>

      <div className="signature-section">
        <div className="signature">Mrityunjay Bhardwaj</div>
        <div className="signature-title">Founder, Mjay Poetry</div>
      </div>

      <div className="social-links">
        <a href="https://www.instagram.com/mjay._0/" target="_blank" rel="noopener noreferrer" className="social-link instagram">
          <FontAwesomeIcon icon={faInstagram} />
          <span className="social-label">Instagram</span>
        </a>
        <a href="https://x.com/im_mjay_0" target="_blank" rel="noopener noreferrer" className="social-link twitter">
          <FontAwesomeIcon icon={faTwitter} />
          <span className="social-label">Twitter</span>
        </a>
        <a href="https://www.linkedin.com/in/mrityunjay-bhardwaj-38012a1b1/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
          <FontAwesomeIcon icon={faLinkedin} />
          <span className="social-label">LinkedIn</span>
        </a>
        <a href="https://www.facebook.com/mrityunjay2864" target="_blank" rel="noopener noreferrer" className="social-link facebook">
          <FontAwesomeIcon icon={faFacebook} />
          <span className="social-label">Facebook</span>
        </a>
        <a href="https://www.threads.net/@mjay._0" target="_blank" rel="noopener noreferrer" className="social-link threads">
          <FontAwesomeIcon icon={faThreads} />
          <span className="social-label">Threads</span>
        </a>
        <a href="https://accounts.snapchat.com/v2/welcome" target="_blank" rel="noopener noreferrer" className="social-link snapchat">
          <FontAwesomeIcon icon={faSnapchat} />
          <span className="social-label">Snapchat</span>
        </a>
        <a href="https://in.pinterest.com/mjay_02/" target="_blank" rel="noopener noreferrer" className="social-link pinterest">
          <FontAwesomeIcon icon={faPinterest} />
          <span className="social-label">Pinterest</span>
        </a>
      </div>
    </div>
  );
};

export default About;
