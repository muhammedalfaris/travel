"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaClock, FaUser, FaStar, FaRegStar, FaStarHalfAlt, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styles from '../styles/TripDetails.module.css';

const TripDetails = ({ trip, comparisonData }) => {
  const [activeTab, setActiveTab] = useState('table');

  // Function to properly format image URLs
  const formatImageUrl = (imagePath) => {
    if (!imagePath) return '/images/default.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `https://res.cloudinary.com/dbkj0h2sh/${imagePath}`;
  };

  // Function to format description with line breaks after full stops
  const formatDescription = (description) => {
    if (!description) return '';
    
    // Split by full stops and filter out empty strings
    const sentences = description.split('.').filter(sentence => sentence.trim().length > 0);
    
    return sentences.map((sentence, index) => (
      <React.Fragment key={index}>
        {sentence.trim()}.
        {index < sentences.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className={styles.star} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className={styles.star} />);
      } else {
        stars.push(<FaRegStar key={i} className={styles.star} />);
      }
    }
    return stars;
  };

  // Function to handle row/card click
  const handleTripClick = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  // Check if any trip has group_priority true to show recommended badge
  const hasRecommendedTrip = comparisonData && comparisonData.some(option => option.isRecommended);

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div 
          className={styles.heroMainImage} 
          style={{backgroundImage: `url(${formatImageUrl(trip.images[0])})`}}
        >
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link> &gt; <Link href="/weekend-trips">Weekend Trips</Link> &gt; <span>{trip.name}</span>
          </div>
        </div>
        <div className={styles.heroSideImages}>
          <div 
            className={styles.sideImage} 
            style={{backgroundImage: `url(${formatImageUrl(trip.images[1] || trip.images[0])})`}}
          ></div>
          <div 
            className={styles.sideImage} 
            style={{backgroundImage: `url(${formatImageUrl(trip.images[2] || trip.images[0])})`}}
          ></div>
        </div>
      </div>

      {/* Trip Title & Location */}
      <div className={styles.tripHeader}>
        <div className={styles.tripMeta}>
          <div className={styles.locationContainer}>
            <FaMapMarkerAlt className={styles.locationIcon} />
            <span className={styles.location}>{trip.location}</span>
          </div>
          <div className={styles.ratingContainer}>
            <div className={styles.stars}>
              {renderStars(trip.rating)}
            </div>
            <span className={styles.ratingText}>
              {trip.rating} / 5 ({trip.reviews} Reviews)
            </span>
          </div>
        </div>
        <h1 className={styles.tripTitle}>{trip.name}</h1>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.contentLeft}>
          {/* Trip Details */}
          <section className={styles.tripDetails}>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <FaClock />
                </div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Duration</div>
                  <div className={styles.infoValue}>{trip.duration}</div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>About This Trip</h2>
            <p className={styles.description}>
              {formatDescription(trip.description)}
            </p>
          </section>

          {comparisonData && comparisonData.length > 0 && (
            <section className={styles.comparisonSection}>
              <h2 className={styles.sectionTitle}>Trip Comparison</h2>
              <p className={styles.comparisonIntro}>
                Compare our options with other tour providers to find your perfect trip experience.
              </p>
              
              <div className={styles.tabButtons}>
                <button 
                  className={`${styles.tabButton} ${activeTab === 'table' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('table')}
                >
                  Table View
                </button>
                <button 
                  className={`${styles.tabButton} ${activeTab === 'cards' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('cards')}
                >
                  Card View
                </button>
              </div>

              {activeTab === 'table' ? (
                <div className={styles.comparisonTable}>
                  <table>
                    <thead>
                      <tr>
                        <th>Tour Provider</th>
                        <th>Package Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((option, index) => (
                        <tr 
                          key={index} 
                          className={`${hasRecommendedTrip && option.isRecommended ? styles.highlightedRow : ''} ${styles.clickableRow}`}
                          onClick={() => handleTripClick(option.url)}
                          style={{ cursor: option.url && option.url !== '#' ? 'pointer' : 'default' }}
                        >
                          <td>
                            <div className={styles.providerCell}>
                              {option.organizer}
                              {hasRecommendedTrip && option.isRecommended && (
                                <span className={styles.recommendedBadge}>Recommended</span>
                              )}
                            </div>
                          </td>
                          <td>{option.name}</td>
                          <td>
                            <div className={styles.priceCell}>
                              <span className={styles.currentPrice}>₹{option.price}</span>
                              {option.originalPrice && (
                                <span className={styles.originalPrice}>₹{option.originalPrice}</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className={styles.comparisonCards}>
                  {comparisonData.map((option, index) => (
                    <div key={index} className={`${styles.comparisonCard} ${hasRecommendedTrip && option.isRecommended ? styles.highlightedCard : ''}`}>
                      <div className={styles.cardHeader}>
                        <h3>{option.organizer}</h3>
                        {hasRecommendedTrip && option.isRecommended && (
                          <span className={styles.recommendedBadge}>Recommended</span>
                        )}
                      </div>
                      <h4>{option.name}</h4>
                      <div className={styles.cardPrice}>
                        <span className={styles.currentPrice}>₹{option.price}</span>
                        {option.originalPrice && (
                          <span className={styles.originalPrice}>₹{option.originalPrice}</span>
                        )}
                      </div>
                      <button 
                        className={styles.selectButton}
                        onClick={() => handleTripClick(option.url)}
                      >
                        Select This Trip
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;