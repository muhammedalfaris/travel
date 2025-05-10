'use client';
import styles from '../styles/Navbar.module.css';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>TravelDusk</div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
        <li className={`${styles.link} ${styles.active}`}>Home</li>
        <li className={styles.link}>Destinations</li>
        <li className={styles.link}>Locations</li>
        <li className={styles.link}>Groups</li>
        <li className={styles.link}>Trips</li>
      </ul>

      <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}
