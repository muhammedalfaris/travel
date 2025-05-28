'use client';

import Navbar from '@/components/Navbar';
import styles from '@/styles/HeroSection.module.css';
import overviewStyles from '@/styles/Overview.module.css';
import instaStyles from '@/styles/InstaSection.module.css';
import topTrip from '@/styles/TopTrips.module.css';
import { useState, useEffect, useRef } from 'react';
import { FaUsers, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaWhatsapp } from 'react-icons/fa';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

export default function Home() {
  // State for API data
  const [destinations, setDestinations] = useState([]);
  const [instaGroups, setInstaGroups] = useState([]);
  const [trips, setTrips] = useState([]);
  const [overviewStats, setOverviewStats] = useState({
    destinations: 0,
    groups: 0,
    instagramGroups: 0,
    trips: 0
  });
  
  // Existing state
  const [bgImage, setBgImage] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all APIs in parallel
        const [destinationRes, instaRes, tripsRes] = await Promise.all([
          fetch('https://travel-rozf.onrender.com/core/destination-info/'),
          fetch('https://travel-rozf.onrender.com/core/instagram/'),
          fetch('https://travel-rozf.onrender.com/core/trips/')
        ]);

        const destinationData = await destinationRes.json();
        const instaData = await instaRes.json();
        const tripsData = await tripsRes.json();

        // Process destination data with priority logic
        const allDestinations = Object.entries(destinationData).map(([name, data]) => {
          const firstTripImage = data.trips[0]?.trip_image[0]?.image || '/images/default.png';
          return {
            name,
            image: firstTripImage.startsWith('http') ? firstTripImage : `https://res.cloudinary.com/dbkj0h2sh/${firstTripImage}`,
            groups: new Set(data.trips.map(trip => trip.group)).size, 
            trips: data.trip_count,
            destination_priority: data.trips.some(trip => trip.destination_priority) // Check if any trip has destination_priority
          };
        });

        // Sort destinations: priority first, then random
        const priorityDestinations = allDestinations.filter(dest => dest.destination_priority);
        const nonPriorityDestinations = shuffleArray(allDestinations.filter(dest => !dest.destination_priority));
        const processedDestinations = [...priorityDestinations, ...nonPriorityDestinations];

        // Process Instagram groups with priority logic
        const priorityInstaGroups = instaData.filter(group => group.group_priority);
        const nonPriorityInstaGroups = shuffleArray(instaData.filter(group => !group.group_priority));
        const sortedInstaGroups = [...priorityInstaGroups, ...nonPriorityInstaGroups];
        
        const processedInstaGroups = sortedInstaGroups.slice(0, 12).map(group => ({
          handle: `@${group.username}`,
          name: group.name,
          url: group.url,
        }));

        // Process trips with priority logic
        const priorityTrips = tripsData.filter(trip => trip.trip_priority);
        const nonPriorityTrips = shuffleArray(tripsData.filter(trip => !trip.trip_priority));
        const sortedTrips = [...priorityTrips, ...nonPriorityTrips];

        const uniqueTrips = [];
        const seenTripNames = new Set();
        
        for (const trip of sortedTrips) {
          if (!seenTripNames.has(trip.trip_spot) && uniqueTrips.length < 12) {
            seenTripNames.add(trip.trip_spot);
            const firstImage = trip.trip_image[0]?.image || '/images/default.png';
            uniqueTrips.push({
              id: trip.id,
              name: trip.trip_spot,
              image: firstImage.startsWith('http') ? firstImage : `https://res.cloudinary.com/dbkj0h2sh/${firstImage}`,
              price: parseFloat(trip.price),
              duration: trip.duration,
              location: trip.destination,
              organizer: trip.group_name,
              description: trip.description,
              discount: null // Not provided in API
            });
          }
        }

        // Calculate overview stats
        const totalGroups = new Set(tripsData.map(trip => trip.group)).size;
        const overviewData = {
          destinations: processedDestinations.length,
          groups: totalGroups,
          instagramGroups: instaData.length,
          trips: tripsData.length
        };

        // Update state
        setDestinations(processedDestinations);
        setInstaGroups(processedInstaGroups);
        setTrips(uniqueTrips);
        setOverviewStats(overviewData);
        
        // Set initial background image
        if (processedDestinations.length > 0) {
          const firstImage = processedDestinations[0].image;
          setBgImage(firstImage.startsWith('http') ? firstImage : `https://res.cloudinary.com/dbkj0h2sh/${firstImage}`);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to default data if API fails
        setDestinations([
          { name: 'Loading...', image: '/images/default.png', groups: 0, trips: 0 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cardsToShow = isMobile ? 1 : 3;
  const visibleCards = destinations.slice(startIndex, startIndex + cardsToShow);
  
  const Counter = ({ end }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 1000;
      const step = Math.max(Math.floor(duration / end), 10);
      const interval = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(interval);
      }, step);
      return () => clearInterval(interval);
    }, [end]);

    return <span>{count}</span>;
  };
  
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className={styles.hero} style={{ backgroundImage: `url(${bgImage})` }}>
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <div className={styles.textBox}>
            <h1 className={styles.title}>Explore Together</h1>
            <p className={styles.description}>
              Your Pocket-Friendly Travel Dost.
              Discover the Cheapest Group Trips in India with Verified Travel Partners Only.
            </p>
            <p>Connect with us</p>
            <a 
              href="#" 
              aria-label="Whatsapp" 
              style={{fontSize:"40px", marginTop:"30px"}}
              onClick={() => window.open(`https://wa.me/919030263255`, '_blank')}
            >
              <FaWhatsapp />
            </a>   
          </div>

          <div className={styles.destinationsSection}>
            <h2 className={styles.destinationsHeading}>Destinations</h2>
            <div className={styles.cardWrapper}>
              <button
                className={styles.arrowBtn}
                onClick={() => setStartIndex(i => Math.max(0, i - 1))}
                disabled={startIndex === 0}
              >
                <FaChevronLeft />
              </button>

              <div className={styles.cards}>
                {visibleCards.map((dest, i) => (
                  <div
                    key={i}
                    className={styles.card}
                    onClick={() => setBgImage(dest.image)}
                    style={{ backgroundImage: `url(${dest.image})` }}
                  >
                    <div className={styles.cardOverlay}>
                      <h3>{dest.name}</h3>
                      <p><FaUsers /> {dest.groups} Groups</p>
                      <p><FaCalendarAlt /> {dest.trips} Trips</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className={styles.arrowBtn}
                onClick={() => setStartIndex(i => Math.min(i + 1, destinations.length - cardsToShow))}
                disabled={startIndex >= destinations.length - cardsToShow}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>
      <SearchBar/>
      
      <section className={overviewStyles.overviewSection}>
        <div className={overviewStyles.overviewContainer}>
          {[
            { label: 'Destinations', value: overviewStats.destinations },
            { label: 'Groups', value: overviewStats.groups },
            { label: 'Instagram groups', value: overviewStats.instagramGroups },
            { label: 'Trips', value: overviewStats.trips }
          ].map((item, index, array) => (
            <div className={overviewStyles.overviewItem} key={index}>
              <div className={overviewStyles.overviewValue}><Counter end={item.value} /></div>
              <div className={overviewStyles.overviewLabel}>{item.label}</div>
              {index < array.length - 1 && (
                <>
                  <div className={overviewStyles.separatorVertical} />
                  <div className={overviewStyles.separatorHorizontal} />
                </>
              )}
            </div>
          ))}
        </div>
      </section>
      
      <section className={instaStyles.travelGroupsSection}>
        <div className={instaStyles.headerContainer}>
          <div className={instaStyles.header}>
            <h2>Instagram Travel Groups</h2>
            <p>Discover top travel groups from Instagram for your next getaway</p>
          </div>
          <Link href="/instagram-groups">
            <button className={topTrip.viewMoreBtn}>View More</button>
          </Link>
        </div>

        <div className={instaStyles.carousel}>
          <button className={instaStyles.arrowLeft} onClick={scrollLeft}>
            <FaChevronLeft />
          </button>

          <div className={instaStyles.cardTrack} ref={scrollRef}>
            {instaGroups.map((group, index) => (
              <div 
                className={instaStyles.card} 
                key={index}
                onClick={() => window.open(group.url, '_blank')}
                style={{ cursor: 'pointer' }}
              >
                <h3>{group.handle}</h3>
                <p className={instaStyles.name}>{group.name}</p>
              </div>
            ))}
          </div>

          <button className={instaStyles.arrowRight} onClick={scrollRight}>
            <FaChevronRight />
          </button>
        </div>
      </section>

      <section className={topTrip.travelGroupsSection}>
        <div className={topTrip.headerContainer}>
          <Link href="/trip">
            <button className={topTrip.viewMoreBtn}>View More</button>
          </Link>
          <div className={topTrip.header}>
            <h2>Top Weekend Trips</h2>
            <p>Unmissable trips to make your weekend epic.</p>
          </div>
        </div>
        
        <div className={topTrip.carousel}>
          <button 
            className={topTrip.arrowLeft} 
            onClick={() => {
              const topTripRef = document.querySelector(`.${topTrip.cardTrack}`);
              if (topTripRef) {
                topTripRef.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
          >
            <FaChevronLeft />
          </button>
          
          <div className={topTrip.cardTrack}>
            {trips.map((trip, index) => (
              <Link href={`/trips/${trip.id}`} key={index}>
                <div className={topTrip.card}>
                  <div className={topTrip.cardImage} style={{ backgroundImage: `url(${trip.image})` }}>
                    {trip.discount && <span className={topTrip.discountTag}>{trip.discount}</span>}
                  </div>
                  <div className={topTrip.cardContent}>
                    <h3 className={topTrip.tripName}>{trip.name}</h3>
                    
                    <div className={topTrip.pricing}>
                      <span className={topTrip.currentPrice}>₹ {trip.price}</span>
                    </div>
                    
                    <div className={topTrip.tripInfo}>
                      <div className={topTrip.infoItem}>
                        <span className={topTrip.infoIcon}>⏱️</span>
                        <span className={topTrip.infoText}>{trip.duration}</span>
                      </div>
                      
                      <div className={topTrip.infoItem}>
                        <span className={topTrip.infoIcon}>📍</span>
                        <span className={topTrip.infoText}>{trip.location}</span>
                      </div>
                      
                      <div className={topTrip.infoItem}>
                        <span className={topTrip.infoIcon}>👤</span>
                        <span className={topTrip.infoText}>{trip.organizer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <button 
            className={topTrip.arrowRight} 
            onClick={() => {
              const topTripRef = document.querySelector(`.${topTrip.cardTrack}`);
              if (topTripRef) {
                topTripRef.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
          >
            <FaChevronRight />
          </button>
        </div>
      </section>
      <Footer/>
    </>
  );
}