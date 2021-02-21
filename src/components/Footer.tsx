import React from 'react';
import './Footer.css';
import CopyrightIcon from '@material-ui/icons/Copyright';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_left">
          <p>Developed By Team Laggards</p> <CopyrightIcon fontSize="small" />
        </div>
        <div className="footer_right">
          <h2>Laggard</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
