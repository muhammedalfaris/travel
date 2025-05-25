'use client';

import { useState } from 'react';
import styles from '@/styles/InstagramGroups.module.css'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function InstagramGroupsPage() {
  const [instaGroups] = useState([
    { handle: 'travellersdosthyderabad', name: 'Travellers Dost Hyderabad' },
    { handle: 'wanderon', name: 'WanderOn' },
    { handle: 'tripotocommunity', name: 'Tripoto Community' },
    { handle: 'backpackersindia', name: 'Backpackers India' },
    { handle: 'travelwithrohit', name: 'Travel With Rohit' },
    { handle: 'indianbackpacker', name: 'Indian Backpacker' },
  ]);

  return (
    <>
      <Navbar />
      <section className={styles.travelGroupsSection}>
        <div className={styles.cardsGrid}>
          {instaGroups.map((group, index) => (
            <div className={styles.card} key={index}>
              <h3>{group.handle}</h3>
              <p className={styles.name}>{group.name}</p>
            </div>
          ))}
        </div>
      </section> 
      <Footer/> 
    </>
  );
}