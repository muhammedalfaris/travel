'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/SearchBar.module.css';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [destination, setDestination] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const searchTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  const fetchSearchResults = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(
        `https://travel-rozf.onrender.com/core/trips/?search=${encodeURIComponent(searchTerm)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      
      const data = await response.json();
      setSearchResults(data);
      setShowDropdown(data.length > 0);
      
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search. Please try again.');
      setSearchResults([]);
      setShowDropdown(false);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const handleInputChange = (e) => {
    const value = e.target.value;
    setDestination(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      fetchSearchResults(value);
    }, 300); // 300ms delay
  };

  // Handle trip selection
  const handleTripSelect = (trip) => {
    setDestination('');
    setShowDropdown(false);
    setSearchResults([]);
    
    // Navigate to trip detail page
    router.push(`/trips/${trip.id}`);
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!destination.trim()) {
      return;
    }

    // If there are search results, select the first one
    if (searchResults.length > 0) {
      handleTripSelect(searchResults[0]);
    } else {
      // Perform search if no results are currently shown
      fetchSearchResults(destination);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBar}>
        <h2 className={styles.searchTitle}>Find your next adventure</h2>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.inputGroup} ref={dropdownRef}>
            <div className={styles.iconWrapper}>
              <FaMapMarkerAlt className={styles.icon} />
            </div>
            <input
              type="text"
              placeholder="Where are you going?"
              value={destination}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={styles.input}
              autoComplete="off"
            />
            
            {/* Search Results Dropdown */}
            {showDropdown && (
              <div className={styles.searchDropdown}>
                {loading ? (
                  <div className={styles.dropdownItem}>
                    <span className={styles.loadingText}>Searching...</span>
                  </div>
                ) : error ? (
                  <div className={styles.dropdownItem}>
                    <span className={styles.errorText}>{error}</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    {searchResults.map((trip) => (
                      <div
                        key={trip.id}
                        className={styles.dropdownItem}
                        onClick={() => handleTripSelect(trip)}
                      >
                        <div className={styles.tripInfo}>
                          <div className={styles.tripHeader}>
                            <span className={styles.tripName}>{trip.trip_spot}</span>
                            <span className={styles.tripPrice}>₹{trip.price}</span>
                          </div>
                          <div className={styles.tripDetails}>
                            <span className={styles.tripDestination}>{trip.destination}</span>
                            <span className={styles.tripDuration}>{trip.duration}</span>
                          </div>
                          <div className={styles.tripOrganizer}>
                            by {trip.group_name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className={styles.dropdownItem}>
                    <span className={styles.noResultsText}>No trips found</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <button type="submit" className={styles.searchButton} disabled={loading}>
            <FaSearch className={styles.searchIcon} />
            <span>{loading ? 'Searching...' : 'Search'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;