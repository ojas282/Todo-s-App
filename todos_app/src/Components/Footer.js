import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img
          src="https://media.licdn.com/dms/image/D4D03AQHJ8v8ZMCkyoA/profile-displayphoto-shrink_400_400/0/1722516698542?e=1728518400&v=beta&t=X18yAf-OfCfxWsvlIf24-dLdH1uR6zhWhhDgSQ4hWB8"
          alt="Ojas Kumar Gupta"
          className="footer-photo"
        />
        <h3>Ojas Kumar Gupta</h3>
        <br></br>
        <p>Made by Ojas Kumar Gupta</p>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/ojas-kumar-gupta-73a3191b9/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/ojas282"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="ojaskumargupta28@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            E-Mail
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
