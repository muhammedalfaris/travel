'use client';
import styles from '@/styles/TripPage.module.css'; 
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to properly format image URLs
  const formatImageUrl = (imagePath) => {
    if (!imagePath) return '/images/default-trip.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `https://res.cloudinary.com/dbkj0h2sh/${imagePath}`;
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('https://travel-rozf.onrender.com/core/trips/');
        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }
        const data = await response.json();

        const processedTrips = data.map(trip => {
          const hasDiscount = Math.random() < 0.3;
          let discountData = null;
          
          if (hasDiscount) {
            const discountPercent = Math.floor(Math.random() * 30) + 10; 
            const originalPrice = parseFloat(trip.price) * (1 + discountPercent/100);
            discountData = {
              discount: `${discountPercent}% OFF`,
              originalPrice: originalPrice.toFixed(2)
            };
          }
          
          return {
            id: trip.id,
            name: trip.trip_spot || 'Not Available',
            image: formatImageUrl(trip.trip_image?.[0]?.image),
            price: trip.price || 'Not Available',
            duration: trip.duration || 'Not Available',
            location: trip.destination || 'Not Available',
            organizer: trip.group_name || 'Not Available',
            ...discountData
          };
        });
        
        setTrips(processedTrips);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrips();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className={styles.loading}>Loading trips...</div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className={styles.error}>Error: {error}</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className={styles.travelGroupsSection}>
        <div className={styles.tripsGrid}>
          {trips.map((trip, index) => (
            <Link href={`/trips/${trip.id}`} key={index}>
              <div className={styles.card}>
                <div 
                  className={styles.cardImage} 
                  style={{ backgroundImage: `url(${trip.image})` }}
                >
                  {trip.discount && <span className={styles.discountTag}>{trip.discount}</span>}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.tripName}>{trip.name}</h3>
                  
                  <div className={styles.pricing}>
                    {trip.price !== 'Not Available' ? (
                      <>
                        <span className={styles.currentPrice}>₹ {trip.price}</span>
                        {trip.originalPrice && <span className={styles.originalPrice}>₹ {trip.originalPrice}</span>}
                      </>
                    ) : (
                      <span className={styles.currentPrice}>Price Not Available</span>
                    )}
                  </div>
                  
                  <div className={styles.tripInfo}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>⏱️</span>
                      <span className={styles.infoText}>{trip.duration}</span>
                    </div>
                    
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>📍</span>
                      <span className={styles.infoText}>{trip.location}</span>
                    </div>
                    
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>👤</span>
                      <span className={styles.infoText}>{trip.organizer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer/> 
    </>
  );
}