// /src/components/Footer.jsx

import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "/src/styles/main.scss";

/**
 * Footer component
 * Includes a newsletter form, site links, and social media icons.
 * Designed to improve user engagement and provide key navigational links.
 */
function Footer() {
  const [email, setEmail] = useState('');

  // Handle newsletter subscription logic (mock)
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log(`Subscribed: ${email}`);
      setEmail('');
      alert('Thanks for subscribing!');
    }
  };

  return (
    <footer className="app-footer" role="contentinfo" aria-labelledby="footer-heading">
      <div className="footer-container">

        {/* --- Top Section --- */}
        <div className="footer-top">

          {/* Newsletter Signup */}
          <div className="footer-newsletter">
            <h2 id="footer-heading">Stay in the loop</h2>
            <p id="newsletter-desc">Get the latest roller derby updates directly to your inbox.</p>
            <form onSubmit={handleSubscribe}>
              <label htmlFor="newsletter-email" className="visually-hidden">
                Email address
              </label>
              <input
                type="email"
                id="newsletter-email"
                placeholder="Enter your email"
                aria-describedby="newsletter-desc"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-links">
            <h2>Quick Links</h2>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Roller Derby Hub. All rights reserved.
          </p>

          {/* Social Media Icons with ARIA labels for accessibility */}
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
