'use client';

import { useState } from 'react';
import styles from '@/styles/Footer.module.css';
import Image from 'next/image';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');

  const openWhatsApp = () => {
    window.open(`https://wa.me/919030263255`, '_blank');
  };

  const openInstagram = () => {
    window.open(`https://www.instagram.com/travellersdosthyderabad?igsh=bHpnZGxyc2ZzaXZj&utm_source=qr`, '_blank');
  };

  return (
    <div className={styles.footerContainer}>
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
            <p className={styles.tagline}>Your Pocket-Friendly Travel Dost.</p>
            <p className={styles.tagline}>Discover the Cheapest Group Trips in India</p>
            <p className={styles.tagline}>Verified Travel Partners Only</p>
          </div>

          <div className={styles.linksColumn}>
            <h4>Menu</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#" onClick={openInstagram}>About</a></li>
              <li><a href="#" onClick={openInstagram}>Packages</a></li>
              <li><a href="#" onClick={openWhatsApp}>Contact</a></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4>Information</h4>
            <ul>
              <li><a href="#" onClick={openInstagram}>Destination</a></li>
              <li><a href="#" onClick={openWhatsApp}>Supports</a></li>
            </ul>
          </div>

          <div className={styles.contactColumn}>
            <h4>Contact Info</h4>
            <ul>
              <li>+91 90302 63255</li>
              <li>info@travellersdost.com</li>
              <li>3rd Floor, Plot, No. 11-14-518/2, Siris Rd, above HP Gas – Samantha Shiva Sakthi Enterprises, Snehapuri Colony, L. B. Nagar, Hyderabad, Telangana 500074</li>
            </ul>
          </div>

          <div className={styles.socialColumn}>
            <h4>Follow us on</h4>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Whatsapp" onClick={openWhatsApp}><FaWhatsapp /></a>
              <a href="#" aria-label="Instagram" onClick={openInstagram}><FaInstagram /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;