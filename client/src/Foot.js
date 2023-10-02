
import React from 'react';


const Foot = () => {
 return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
          A blog is an informational website run by an individualthat offers regularly updated content (blog post) about a topic. 
          </p>
        </div>
        <div className="footer-section-links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="https://6511dad7fa4fbc1057282563--stellular-haupia-ee1e84.netlify.app/">Contact to Developer</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: risabht043.com</p>
          <p>Phone: +916392891566</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Saurabh Tiwari. All rights reserved.</p>
      </div>
    </div>
 );
};

export default Foot;