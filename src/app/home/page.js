'use client';

import Navbar from '@/components/Navbar';
import styles from '@/styles/HeroSection.module.css';
import overviewStyles from '@/styles/Overview.module.css';
import instaStyles from '@/styles/InstaSection.module.css';
import travGroup from '@/styles/TopTravelGroups.module.css';
import { useState, useEffect, useRef } from 'react';
import { FaUsers, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Footer from '@/components/Footer';
import SearchBar from '@/components/Searchbar';

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
  ];

  const travelGroups = [
    {
      name: 'BanBanjara',
      location: 'Bangalore',
      trips: '195 Trips',
      image: '/images/travel-group-1.jpg',
    },
    {
      name: 'Bhatakna Tours and Travels',
      location: 'Multiple locations',
      trips: '157 Trips',
      image: '/images/travel-group-2.jpg',
    },
    {
      name: 'EnLive Trip Experiences',
      location: 'Delhi',
      trips: '61 Trips',
      image: '/images/travel-group-3.jpg',
    },
    {
      name: 'Bangalore Mountaineering',
      location: 'Bangalore',
      trips: '43 Trips',
      image: '/images/travel-group-4.jpg',
    },
    {
      name: 'Bangalore Mountaineering',
      location: 'Bangalore',
      trips: '43 Trips',
      image: '/images/travel-group-4.jpg',
    },
    {
      name: 'Bangalore Mountaineering',
      location: 'Bangalore',
      trips: '43 Trips',
      image: '/images/travel-group-4.jpg',
    },
  ];

  return (
    <>
      <Navbar />
      <section className={styles.hero} style={{ backgroundImage: `url(${bgImage})` }}>
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <div className={styles.textBox}>
            <h1 className={styles.title}>World Tours</h1>
            <p className={styles.description}>
              This text presents my research journey on the topic of Music and Tourism Imaginaries and gives the context...
            </p>
            <button className={styles.button}>See More</button>
          </div>

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
      </section>
      <SearchBar/>
      
      <section className={overviewStyles.overviewSection}>
        <div className={overviewStyles.overviewContainer}>
          {[
            { label: 'Locations', value: 6 },
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
        <div className={instaStyles.header}>
          <h2>Instagram Travel Groups</h2>
          <p>Here some awesome travel accounts to inspire your next trip</p>
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
                <div className={instaStyles.stats}>
                  <p>👥 {group.followers} followers</p>
                  <p>➡️ {group.following} following</p>
                  <p>📸 {group.posts} posts</p>
                </div>
              </div>
            ))}
          </div>

          <button className={instaStyles.arrowRight} onClick={scrollRight}>
            <FaChevronRight />
          </button>
        </div>
      </section>
      
      <section className={travGroup.travelGroupsSection}>
        <div className={travGroup.header}>
          <h2>Top Travel Groups</h2>
          <p>Here some awesome travel groups to inspire your next trip</p>
        </div>

        <div className={travGroup.carousel}>
          <button className={travGroup.arrowLeft} onClick={() => {
            if (travelGroupsRef.current) {
              travelGroupsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
            }
          }}>
            <FaChevronLeft />
          </button>

          <div className={travGroup.cardTrack} ref={travelGroupsRef}>
            {travelGroups.map((group, index) => (
              <div className={travGroup.card} key={index}>
                <div className={travGroup.cardImage} style={{ backgroundImage: `url(${group.image})` }}>
                  <div className={travGroup.cardOverlay}></div>
                </div>
                <div className={travGroup.cardContent}>
                  <h3>{group.name}</h3>
                  <p className={travGroup.location}>{group.location} · {group.trips}</p>
                </div>
              </div>
            ))}
          </div>

          <button className={travGroup.arrowRight} onClick={() => {
            if (travelGroupsRef.current) {
              travelGroupsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            }
          }}>
            <FaChevronRight />
          </button>
        </div>
      </section>
      <Footer/>
    </>
  );
}