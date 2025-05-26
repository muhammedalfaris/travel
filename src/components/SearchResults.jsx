'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/SearchResults.module.css';
import { FaMapMarkerAlt, FaUsers, FaClock, FaRupeeSign, FaSearch } from 'react-icons/fa';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setError('No search query provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        setNoResults(false);

        const response = await fetch(
          `https://travel-rozf.onrender.com/core/trips/?search=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (Array.isArray(data) && data.length === 0) {
          setNoResults(true);
        } else if (Array.isArray(data)) {
          // Process the search results
          const processedResults = data.map(trip => {
            const firstImage = trip.trip_image && trip.trip_image[0] 
              ? trip.trip_image[0].image 
              : '/images/default-trip.png';
            
            return {
              id: trip.id,
              name: trip.trip_spot,
              destination: trip.destination,
              price: parseFloat(trip.price),
              duration: trip.duration,
              organizer: trip.group_name,
              description: trip.description,
              image: firstImage.startsWith('http') 
                ? firstImage 
                : `https://travel-rozf.onrender.com${firstImage}`,
              group: trip.group
            };
          });
          
          setSearchResults(processedResults);
        } else {
          setNoResults(true);
        }

      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  return (
    <>
      <Navbar />
      <div className={styles.searchResultsContainer}>
        <div className={styles.searchHeader}>
          <div className={styles.searchInfo}>
            <FaSearch className={styles.searchIcon} />
            <div>
              <h1 className={styles.searchTitle}>
                Search Results for "{query}"
              </h1>
              {!loading && !error && (
                <p className={styles.resultCount}>
                  {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.resultsContent}>
          {loading && (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Searching for trips...</p>
            </div>
          )}

          {error && (
            <div className={styles.errorState}>
              <p className={styles.errorMessage}>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className={styles.retryButton}
              >
                Try Again
              </button>
            </div>
          )}

          {noResults && !loading && !error && (
            <div className={styles.noResultsState}>
              <FaMapMarkerAlt className={styles.noResultsIcon} />
              <h3>No trips found</h3>
              <p>We couldn't find any trips matching "{query}"</p>
              <p>Try searching for:</p>
              <ul className={styles.suggestions}>
                <li>Popular destinations like "Goa", "Manali", "Rishikesh"</li>
                <li>Trip types like "trekking", "beach", "adventure"</li>
                <li>Nearby cities or states</li>
              </ul>
              <Link href="/" className={styles.backHomeButton}>
                Back to Home
              </Link>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className={styles.resultsGrid}>
              {searchResults.map((trip) => (
                <Link href={`/trips/${trip.id}`} key={trip.id} className={styles.tripCard}>
                  <div className={styles.tripImage}>
                    <img src={trip.image} alt={trip.name} />
                  </div>
                  <div className={styles.tripContent}>
                    <h3 
                      className={styles.tripName}
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(trip.name, query)
                      }}
                    />
                    <div className={styles.tripLocation}>
                      <FaMapMarkerAlt />
                      <span 
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(trip.destination, query)
                        }}
                      />
                    </div>
                    <p className={styles.tripDescription}>
                      {trip.description.length > 100 
                        ? `${trip.description.substring(0, 100)}...`
                        : trip.description
                      }
                    </p>
                    <div className={styles.tripDetails}>
                      <div className={styles.tripDetail}>
                        <FaClock />
                        <span>{trip.duration}</span>
                      </div>
                      <div className={styles.tripDetail}>
                        <FaUsers />
                        <span>{trip.organizer}</span>
                      </div>
                    </div>
                    <div className={styles.tripPrice}>
                      <FaRupeeSign />
                      <span className={styles.priceAmount}>{trip.price}</span>
                      <span className={styles.priceLabel}>per person</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;