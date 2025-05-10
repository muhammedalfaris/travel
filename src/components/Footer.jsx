'use client';

import { useState } from 'react';
import styles from '@/styles/Footer.module.css';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { RiPinterestFill } from 'react-icons/ri';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <div className={styles.footerContainer}>
      <div className={styles.newsletterWrapper}>
        <div className={styles.newsletter}>
          <h3>Our Newsletter</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.subscribeBtn}>Subscribe</button>
          </form>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.brandColumn}>
            <div className={styles.brandLogo}>
              <Image 
                src="/images/tdlogo.png" 
                alt="TravelDusk Logo" 
                width={120}  
                height={60} 
                className={styles.logoImage}
                />
            </div>
            <p className={styles.tagline}>Book your trip in minute, get full control for much longer.</p>
          </div>

          <div className={styles.linksColumn}>
            <h4>Menu</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Packages</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4>Information</h4>
            <ul>
              <li><a href="#">Destination</a></li>
              <li><a href="#">Supports</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </div>

          <div className={styles.contactColumn}>
            <h4>Contact Info</h4>
            <ul>
              <li>+123 456 789</li>
              <li>info@travellersdust.com</li>
              <li>1234 Somewhere Rd.<br />New York, NY 12345, USA</li>
            </ul>
          </div>

          <div className={styles.socialColumn}>
            <h4>Follow us on</h4>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Pinterest"><RiPinterestFill /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;