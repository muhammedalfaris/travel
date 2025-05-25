'use client';
import styles from '@/styles/TripPage.module.css'; 
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TripsPage() {
  const trips = [
    { 
      id: 1,
      name: 'Kodachadri Trek Shivamogga From...',
      image: '/images/kodachadri.png',
      price: 4236,
      duration: '2 days 1 night',
      location: 'Bangalore',
      organizer: 'Namma Trip',
      discount: null
    },
    { 
      id: 2,
      name: 'Nandi Hills Sunrise Trek',
      image: '/images/nandi.png',
      price: 349,
      originalPrice: 498,
      discount: '30% OFF',
      duration: '1 day',
      location: 'Bangalore',
      organizer: 'escape2explore'
    },
    { 
      id: 3,
      name: 'Kumara Parvatha Trek',
      image: '/images/kumara.png',
      price: 2999,
      originalPrice: 3500,
      discount: '15% OFF',
      duration: '2 days',
      location: 'Mangalore',
      organizer: 'TrekBuddy'
    },
    { 
      id: 4,
      name: 'Coorg Coffee Estate Tour',
      image: '/images/coorg.png',
      price: 1899,
      duration: '1 day',
      location: 'Coorg',
      organizer: 'Nature Walks',
      discount: null
    },
    { 
      id: 5,
      name: 'Gokarna Beach Trek',
      image: '/images/gokarna.png',
      price: 2499,
      originalPrice: 2999,
      discount: '17% OFF',
      duration: '2 days 1 night',
      location: 'Gokarna',
      organizer: 'BeachTreks'
    }
  ];

  return (
    <>
      <Navbar />
      <section className={styles.travelGroupsSection}>

        <div className={styles.tripsGrid}>
          {trips.map((trip, index) => (
            <Link href={`/trips/${trip.id}`} key={index}>
              <div className={styles.card}>
                <div className={styles.cardImage} style={{ backgroundImage: `url(${trip.image})` }}>
                  {trip.discount && <span className={styles.discountTag}>{trip.discount}</span>}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.tripName}>{trip.name}</h3>
                  
                  <div className={styles.pricing}>
                    <span className={styles.currentPrice}>₹ {trip.price}</span>
                    {trip.originalPrice && <span className={styles.originalPrice}>₹ {trip.originalPrice}</span>}
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