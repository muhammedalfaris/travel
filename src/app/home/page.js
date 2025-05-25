'use client';

import Navbar from '@/components/Navbar';
import styles from '@/styles/HeroSection.module.css';
import overviewStyles from '@/styles/Overview.module.css';
import instaStyles from '@/styles/InstaSection.module.css';
import travGroup from '@/styles/TopTravelGroups.module.css';
import mustDest from '@/styles/MustDest.module.css';
import topTrip from '@/styles/TopTrips.module.css';
import { useState, useEffect, useRef } from 'react';
import { FaUsers, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaWhatsapp } from 'react-icons/fa';
import Footer from '@/components/Footer';
import SearchBar from '@/components/Searchbar';
import Link from 'next/link';

export default function Home() {
  const destinations = [
    { name: 'Pune', image: '/images/madhura.png', groups: 4, trips: 108 },
    { name: 'Delhi', image: '/images/amalfi.png', groups: 3, trips: 71 },
    { name: 'Mumbai', image: '/images/jaipur.png', groups: 2, trips: 101 },
    { name: 'Goa', image: '/images/goa.png', groups: 5, trips: 120 },
  ];

  const [bgImage, setBgImage] = useState(destinations[0].image);
  const [startIndex, setStartIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
  const travelGroupsRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const instaGroups = [
    {
      handle: '@trippertrails',
      name: 'Tripper Trails®',
      followers: '95.5K',
      following: '14',
      posts: '819',
    },
    {
      handle: '@trekhieversofficial',
      name: 'Trekhievers - Your Adventure Mate',
      followers: '65K',
      following: '191',
      posts: '2,401',
    },
    {
      handle: '@trekhieversofficial',
      name: 'Trekhievers - Your Adventure Mate',
      followers: '65K',
      following: '191',
      posts: '2,401',
    },
    {
      handle: '@trekhieversofficial',
      name: 'Trekhievers - Your Adventure Mate',
      followers: '65K',
      following: '191',
      posts: '2,401',
    },
    {
      handle: '@trekhieversofficial',
      name: 'Trekhievers - Your Adventure Mate',
      followers: '65K',
      following: '191',
      posts: '2,401',
    },
  ];

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
            { label: 'Destinations', value: 367 },
            { label: 'Groups', value: 24 },
            { label: 'Instagram groups', value: 50 },
            { label: 'Trips', value: 805 }
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
              <div className={instaStyles.card} key={index}>
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
            {[
              { 
                id:1,
                name: 'Kodachadri Trek Shivamogga From...',
                image: '/images/kodachadri.png',
                price: 4236,
                duration: '2 days 1 night',
                location: 'Bangalore',
                organizer: 'Namma Trip',
                discount: null
              },
              { 
                id:2,
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
                id:3,
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
                id:4,
                name: 'Coorg Coffee Estate Tour',
                image: '/images/coorg.png',
                price: 1899,
                duration: '1 day',
                location: 'Coorg',
                organizer: 'Nature Walks',
                discount: null
              },
              { 
                id:5,
                name: 'Gokarna Beach Trek',
                image: '/images/gokarna.png',
                price: 2499,
                originalPrice: 2999,
                discount: '17% OFF',
                duration: '2 days 1 night',
                location: 'Gokarna',
                organizer: 'BeachTreks'
              }
            ].map((trip, index) => (
              <Link href={`/trips/${trip.id}`} key={index}>
                <div className={topTrip.card}>
                  <div className={topTrip.cardImage} style={{ backgroundImage: `url(${trip.image})` }}>
                    {trip.discount && <span className={topTrip.discountTag}>{trip.discount}</span>}
                  </div>
                  <div className={topTrip.cardContent}>
                    <h3 className={topTrip.tripName}>{trip.name}</h3>
                    
                    <div className={topTrip.pricing}>
                      <span className={topTrip.currentPrice}>₹ {trip.price}</span>
                      {trip.originalPrice && <span className={topTrip.originalPrice}>₹ {trip.originalPrice}</span>}
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