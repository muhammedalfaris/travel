'use client';
import styles from '../styles/Navbar.module.css';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path ? styles.active : '';
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image 
            src="/images/tdlogo.png" 
            alt="TravelDusk Logo" 
            width={120}  
            height={60} 
            className={styles.logoImage}
          />
        </Link>
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
        <li className={`${styles.link} ${isActive('/home')}`}>
          <Link href="/home">Home</Link>
        </li>
        <li className={`${styles.link} ${isActive('/trip')}`}>
          <Link href="/trip">Trips</Link>
        </li>
        <li className={`${styles.link} ${isActive('/instagram-groups')}`}>
          <Link href="/instagram-groups">Instagram Groups</Link>
        </li>
      </ul>

      <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}