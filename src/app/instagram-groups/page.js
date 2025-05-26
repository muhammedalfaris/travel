'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/InstagramGroups.module.css'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function InstagramGroupsPage() {
  const [instaGroups, setInstaGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstagramGroups = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://travel-rozf.onrender.com/core/instagram/');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setInstaGroups(data);
      } catch (err) {
        console.error('Error fetching Instagram groups:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramGroups();
  }, []);

  const handleCardClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <section className={styles.travelGroupsSection}>
          <div className={styles.loadingContainer}>
            <p>Loading Instagram groups...</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <section className={styles.travelGroupsSection}>
          <div className={styles.errorContainer}>
            <p>Error loading Instagram groups: {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className={styles.travelGroupsSection}>
        <div className={styles.cardsGrid}>
          {instaGroups.map((group) => (
            <div 
              className={styles.card} 
              key={group.id}
              onClick={() => handleCardClick(group.url)}
              style={{ cursor: 'pointer' }}
            >
              <h3>{group.username}</h3>
              <p className={styles.name}>{group.name}</p>
            </div>
          ))}
        </div>
      </section> 
      <Footer/> 
    </>
  );
}