"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaClock, FaUser, FaStar, FaRegStar, FaStarHalfAlt, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styles from '../styles/TripDetails.module.css';

const TripDetails = ({ trip }) => {
  // Sample trip data (replace with actual data from your API or props)
  const tripData = trip || {
    id: 2,
    name: 'Nandi Hills Sunrise Trek',
    location: 'Nandi Village, Chikkaballapur',
    rating: 4.7,
    reviews: 153,
    price: 349,
    originalPrice: 498,
    discount: '30% OFF',
    duration: '1D / 1N',
    category: 'Sunrise Treks',
    minAge: '5+',
    taxInfo: 'No Hidden Charges',
    organizer: 'escape2explore',
    images: [
      '/images/nandi.png',
      '/images/nandi1.png',
      '/images/nandi2.png',
    ],
    description: 'Experience the breathtaking sunrise at Nandi Hills, one of the most popular weekend getaways from Bangalore. This early morning trek offers panoramic views of the surrounding landscapes covered in mist.',
    highlights: [
      'Witness spectacular sunrise views from 1,478m elevation',
      'Trek through refreshing morning mist and clouds',
      'Explore ancient temples and historical structures',
      'Perfect for beginners and families with kids above 5 years',
      'Guided experience with photography opportunities'
    ],
    inclusions: [
      'Professional trek guide',
      'Basic first aid',
      'Entry fees',
      'Breakfast'
    ],
    exclusions: [
      'Transportation to and from Nandi Hills',
      'Personal expenses',
      'Any meals not mentioned',
      'Insurance'
    ]
  };

  // Sample competitor trip options for comparison
  const comparisonData = [
    {
      organizer: 'escape2explore',
      name: 'Nandi Hills Sunrise Trek',
      price: 349,
      originalPrice: 498,
      groupSize: 'Medium (15-20)',
      transportIncluded: false,
      mealsIncluded: 'Breakfast only',
      highlights: ['Professional guides', 'First aid support', 'Photo stops']
    },
    {
      organizer: 'TrekVentures',
      name: 'Nandi Sunrise Special',
      price: 499,
      originalPrice: 599,
      groupSize: 'Small (8-12)',
      transportIncluded: true,
      mealsIncluded: 'Breakfast only',
      highlights: ['Transport from city', 'Professional guides', 'Photo stops']
    },
    {
      organizer: 'BangaloreOutdoors',
      name: 'Nandi Hills Trek & Temple Visit',
      price: 599,
      originalPrice: 699,
      groupSize: 'Large (20-30)',
      transportIncluded: true,
      mealsIncluded: 'Breakfast and snacks',
      highlights: ['Transport included', 'Temple tour', 'Breakfast & snacks']
    }
  ];

  // State for active tab in comparison section
  const [activeTab, setActiveTab] = useState('table');

  // Function to render star ratings
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

  return (
    <div className={styles.container}>
      {/* Hero Section with 3 Images */}
      <div className={styles.heroSection}>
        <div className={styles.heroMainImage} style={{backgroundImage: `url(${tripData.images[0]})`}}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link> &gt; <Link href="/weekend-trips">Weekend Trips</Link> &gt; <span>{tripData.name}</span>
          </div>
        </div>
        <div className={styles.heroSideImages}>
          <div className={styles.sideImage} style={{backgroundImage: `url(${tripData.images[1]})`}}></div>
          <div className={styles.sideImage} style={{backgroundImage: `url(${tripData.images[2]})`}}></div>
        </div>
      </div>

      {/* Trip Title & Location */}
      <div className={styles.tripHeader}>
        <div className={styles.tripMeta}>
          <div className={styles.locationContainer}>
            <FaMapMarkerAlt className={styles.locationIcon} />
            <span className={styles.location}>{tripData.location}</span>
          </div>
          <div className={styles.ratingContainer}>
            <div className={styles.stars}>
              {renderStars(tripData.rating)}
            </div>
            <span className={styles.ratingText}>
              {tripData.rating} / 5 ({tripData.reviews} Reviews)
            </span>
          </div>
        </div>
        <h1 className={styles.tripTitle}>{tripData.name}</h1>
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
                  <div className={styles.infoValue}>{tripData.duration}</div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <FaUser />
                </div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Tour Category</div>
                  <div className={styles.infoValue}>{tripData.category}</div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <span className={styles.ageIcon}>5+</span>
                </div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Min Age</div>
                  <div className={styles.infoValue}>{tripData.minAge}</div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <span className={styles.taxIcon}>₹</span>
                </div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>Tax</div>
                  <div className={styles.infoValue}>{tripData.taxInfo}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>About This Trip</h2>
            <p className={styles.description}>{tripData.description}</p>
          </section>

          {/* Highlights */}
          <section className={styles.highlightsSection}>
            <h2 className={styles.sectionTitle}>Trip Highlights</h2>
            <ul className={styles.highlightsList}>
              {tripData.highlights.map((highlight, index) => (
                <li key={index} className={styles.highlightItem}>
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          {/* Inclusions/Exclusions */}
          <section className={styles.includesSection}>
            <div className={styles.columnGrid}>
              <div className={styles.column}>
                <h3 className={styles.columnTitle}>What's Included</h3>
                <ul className={styles.includesList}>
                  {tripData.inclusions.map((item, index) => (
                    <li key={index} className={styles.includesItem}>
                      <span className={styles.includeIcon}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.column}>
                <h3 className={styles.columnTitle}>What's Not Included</h3>
                <ul className={styles.includesList}>
                  {tripData.exclusions.map((item, index) => (
                    <li key={index} className={styles.excludesItem}>
                      <span className={styles.excludeIcon}>✕</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Trip Comparison Section */}
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
                      <th>Group Size</th>
                      <th>Transport</th>
                      <th>Meals</th>
                      <th>Key Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((option, index) => (
                      <tr key={index} className={option.organizer === 'escape2explore' ? styles.highlightedRow : ''}>
                        <td>{option.organizer}</td>
                        <td>{option.name}</td>
                        <td>
                          <div className={styles.priceCell}>
                            <span className={styles.currentPrice}>₹{option.price}</span>
                            {option.originalPrice && (
                              <span className={styles.originalPrice}>₹{option.originalPrice}</span>
                            )}
                          </div>
                        </td>
                        <td>{option.groupSize}</td>
                        <td>{option.transportIncluded ? 'Included' : 'Not included'}</td>
                        <td>{option.mealsIncluded}</td>
                        <td>
                          <ul className={styles.featuresList}>
                            {option.highlights.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.comparisonCards}>
                {comparisonData.map((option, index) => (
                  <div key={index} className={`${styles.comparisonCard} ${option.organizer === 'escape2explore' ? styles.highlightedCard : ''}`}>
                    <div className={styles.cardHeader}>
                      <h3>{option.organizer}</h3>
                      {option.organizer === 'escape2explore' && <span className={styles.recommendedBadge}>Recommended</span>}
                    </div>
                    <h4>{option.name}</h4>
                    <div className={styles.cardPrice}>
                      <span className={styles.currentPrice}>₹{option.price}</span>
                      {option.originalPrice && (
                        <span className={styles.originalPrice}>₹{option.originalPrice}</span>
                      )}
                    </div>
                    <div className={styles.cardDetails}>
                      <div className={styles.cardDetail}>
                        <span className={styles.detailLabel}>Group Size:</span>
                        <span className={styles.detailValue}>{option.groupSize}</span>
                      </div>
                      <div className={styles.cardDetail}>
                        <span className={styles.detailLabel}>Transport:</span>
                        <span className={styles.detailValue}>{option.transportIncluded ? 'Included' : 'Not included'}</span>
                      </div>
                      <div className={styles.cardDetail}>
                        <span className={styles.detailLabel}>Meals:</span>
                        <span className={styles.detailValue}>{option.mealsIncluded}</span>
                      </div>
                    </div>
                    <div className={styles.cardFeatures}>
                      <span className={styles.featuresLabel}>Key Features:</span>
                      <ul>
                        {option.highlights.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    {option.organizer === 'escape2explore' && (
                      <button className={styles.selectButton}>Select This Trip</button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;