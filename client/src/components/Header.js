import React from 'react';
import './Header.css';

const Header = ({ title = "Welcome to My Shayari Website" }) => {
  return (
    <header className="App-header" aria-label="Main header of the page">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
