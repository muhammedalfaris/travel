'use client';

import { useState } from 'react';
import styles from '@/styles/SearchBar.module.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaSearch } from 'react-icons/fa';
// import { IoMdArrowDropdown } from 'react-icons/io';

const SearchBar = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const [travelers, setTravelers] = useState('');
  // const [travelersOpen, setTravelersOpen] = useState(false);
  
  // const [adults, setAdults] = useState(1);
  // const [children, setChildren] = useState(0);
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search params:', { destination, startDate, endDate,  });
    // Close travelers dropdown if open
    setTravelersOpen(false);
  };

  // const handleTravelersUpdate = () => {
  //   setTravelers(`${adults} Adults, ${children} Children`);
  //   setTravelersOpen(false);
  // };

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBar}>
        <h2 className={styles.searchTitle}>Find your next adventure</h2>
        
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.inputGroup}>
            <div className={styles.iconWrapper}>
              <FaMapMarkerAlt className={styles.icon} />
            </div>
            <input
              type="text"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          
          {/* <div className={styles.inputGroup}>
            <div className={styles.iconWrapper}>
              <FaCalendarAlt className={styles.icon} />
            </div>
            <input
              type="date"
              placeholder="Check in"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <div className={styles.iconWrapper}>
              <FaCalendarAlt className={styles.icon} />
            </div>
            <input
              type="date"
              placeholder="Check out"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.input}
              required
            />
          </div> */}
          
          
          
          <button type="submit" className={styles.searchButton}>
            <FaSearch className={styles.searchIcon} />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;