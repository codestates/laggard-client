import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_left">
          <p>Developed By © 2021 Team Laggards</p>
        </div>
        <div className="footer_right">
          <h2>Laggard</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
