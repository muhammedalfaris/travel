'use client';

import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaStar, FaChevronLeft, FaChevronRight, FaInstagram, FaFacebook, FaTwitter, FaGlobe } from 'react-icons/fa';
import styles from '@/styles/TravelGroupDetail.module.css';
import Link from 'next/link';

export default function TravelGroupDetail({ params }) {
  const { id } = params;
  
  // This would normally come from API/database based on the ID
  const groupData = {
    id: id,
    name: 'BanBanjara',
    description: 'Find, Explore and Book Experiential Activities, Adventures & Things to Do. With BanBanjara, Book Online Trips such as Trekking, Camping, Rafting, Paragliding, and many more.',
    location: 'Bangalore',
    totalTrips: 195,
    rating: 4.8,
    reviewCount: 324,
    followers: '95.5K',
    established: 2016,
    instaHandle: '@banbanjara',
    website: 'www.banbanjara.com',
    contactEmail: 'hello@banbanjara.com',
    contactPhone: '+91 9876543210',
    coverImage: '/images/banglore.png',
    profileImage: '/images/banglore.png', // Using existing image as placeholder
    socialLinks: {
      instagram: 'https://instagram.com/banbanjara',
      facebook: 'https://facebook.com/banbanjara',
      twitter: 'https://twitter.com/banbanjara',
      website: 'https://banbanjara.com'
    },
    highlights: [
      'Specializes in weekend getaways',
      'Certified adventure guides',
      'All-inclusive packages',
      'Small group experiences'
    ]
  };

  // Mock trip data
  const trips = [
    {
      id: 1,
      name: 'Gokarna, Dandeli, Yana, Murudeshwar & Jog Falls',
      image: '/images/gokarna.png',
      price: 2299,
      originalPrice: 2599,
      discount: '12% OFF',
      duration: '4 days 3 nights',
      location: 'Bangalore',
      rating: 4.9,
      reviewCount: 128
    },
    {
      id: 2,
      name: 'Kodachadri Trek Shivamogga',
      image: '/images/kodachadri.png',
      price: 4236,
      duration: '2 days 1 night',
      location: 'Bangalore',
      rating: 4.7,
      reviewCount: 96
    },
    {
      id: 3,
      name: 'Coorg Coffee Estate Tour',
      image: '/images/coorg.png',
      price: 1899,
      duration: '1 day',
      location: 'Coorg',
      rating: 4.8,
      reviewCount: 105
    },
    {
      id: 4,
      name: 'Nandi Hills Sunrise Trek',
      image: '/images/nandi.png',
      price: 349,
      originalPrice: 498,
      discount: '30% OFF',
      duration: '1 day',
      location: 'Bangalore',
      rating: 4.6,
      reviewCount: 215
    }
  ];

  // Mock testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sharma',
      rating: 5,
      comment: 'Amazing experience with BanBanjara! The trip was well-organized and the guides were knowledgeable. Will definitely book again.',
      tripName: 'Gokarna Trek',
      date: 'April 2023'
    },
    {
      id: 2,
      name: 'Priya Patel',
      rating: 4,
      comment: 'Had a wonderful time on the trek. The views were breathtaking and the team took care of all the arrangements perfectly.',
      tripName: 'Kodachadri Trek',
      date: 'March 2023'
    },
    {
      id: 3,
      name: 'Akash Gupta',
      rating: 5,
      comment: 'Best weekend getaway experience! Everything from food to stay was top-notch. Highly recommend for adventure enthusiasts.',
      tripName: 'Coorg Weekend',
      date: 'May 2023'
    }
  ];

  const tripsRef = useRef(null);
  const testimonialsRef = useRef(null);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      
      <div className={styles.coverImage} style={{ backgroundImage: `url(${groupData.coverImage})` }}>
        <div className={styles.overlay}></div>
      </div>
      
      <main className={styles.container}>
        <div className={styles.profileHeader}>
          <div className={styles.profileImageContainer}>
            <img 
              src={groupData.profileImage} 
              alt={groupData.name} 
              className={styles.profileImage}
            />
          </div>
          
          <div className={styles.profileInfo}>
            <h1 className={styles.groupName}>{groupData.name}</h1>
            <div className={styles.detailsRow}>
              <div className={styles.detailItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <span>{groupData.location}</span>
              </div>
              <div className={styles.detailItem}>
                <FaCalendarAlt className={styles.icon} />
                <span>{groupData.totalTrips} Trips</span>
              </div>
              <div className={styles.detailItem}>
                <FaUsers className={styles.icon} />
                <span>{groupData.followers} followers</span>
              </div>
              <div className={styles.detailItem}>
                <FaStar className={styles.icon} />
                <span>{groupData.rating} ({groupData.reviewCount} reviews)</span>
              </div>
            </div>
            
            <div className={styles.socialLinks}>
              <a href={groupData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaInstagram />
              </a>
              <a href={groupData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaFacebook />
              </a>
              <a href={groupData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaTwitter />
              </a>
              <a href={groupData.socialLinks.website} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaGlobe />
              </a>
            </div>
            
            <div className={styles.actionButtons}>
              <button className={styles.primaryButton}>Follow</button>
              <button className={styles.secondaryButton}>Contact</button>
            </div>
          </div>
        </div>
        
        <div className={styles.aboutSection}>
          <div className={styles.sectionHeader}>
            <h2>About Us</h2>
          </div>
          <p className={styles.description}>{groupData.description}</p>
          
          <div className={styles.highlightsContainer}>
            <h3>Highlights</h3>
            <div className={styles.highlights}>
              {groupData.highlights.map((highlight, index) => (
                <div key={index} className={styles.highlightItem}>
                  <span className={styles.highlightIcon}>✓</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <section className={styles.tripsSection}>
          <div className={styles.sectionHeader}>
            <h2>Popular Trips</h2>
            <button className={styles.viewMoreBtn}>View All Trips</button>
          </div>
          
          <div className={styles.carousel}>
            <button 
              className={styles.arrowLeft} 
              onClick={() => scrollLeft(tripsRef)}
            >
              <FaChevronLeft />
            </button>
            
            <div className={styles.cardTrack} ref={tripsRef}>
              {trips.map((trip) => (
                <Link href={`/trips/${trip.id}`} key={trip.id}>
                  <div className={styles.tripCard}>
                    <div className={styles.cardImage} style={{ backgroundImage: `url(${trip.image})` }}>
                      {trip.discount && <span className={styles.discountTag}>{trip.discount}</span>}
                      <div className={styles.cardOverlay}></div>
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.tripName}>{trip.name}</h3>
                      
                      <div className={styles.pricing}>
                        <span className={styles.currentPrice}>₹ {trip.price}</span>
                        {trip.originalPrice && <span className={styles.originalPrice}>₹ {trip.originalPrice}</span>}
                      </div>
                      
                      <div className={styles.tripRating}>
                        <span className={styles.stars}>
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(trip.rating) ? styles.starFilled : styles.starEmpty} />
                          ))}
                        </span>
                        <span className={styles.reviewCount}>{trip.rating} ({trip.reviewCount})</span>
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
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <button 
              className={styles.arrowRight} 
              onClick={() => scrollRight(tripsRef)}
            >
              <FaChevronRight />
            </button>
          </div>
        </section>
        
        <section className={styles.testimonialSection}>
          <div className={styles.sectionHeader}>
            <h2>What Travelers Say</h2>
            <button className={styles.viewMoreBtn}>View All Reviews</button>
          </div>
          
          <div className={styles.carousel}>
            <button 
              className={styles.arrowLeft} 
              onClick={() => scrollLeft(testimonialsRef)}
            >
              <FaChevronLeft />
            </button>
            
            <div className={styles.cardTrack} ref={testimonialsRef}>
              {testimonials.map((testimonial) => (
                <div className={styles.testimonialCard} key={testimonial.id}>
                  <div className={styles.testimonialHeader}>
                    <div className={styles.testimonialUser}>
                      <div className={styles.userInitial}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className={styles.userInfo}>
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.tripName} • {testimonial.date}</p>
                      </div>
                    </div>
                    <div className={styles.testimonialRating}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < testimonial.rating ? styles.starFilled : styles.starEmpty} />
                      ))}
                    </div>
                  </div>
                  <p className={styles.testimonialComment}>{testimonial.comment}</p>
                </div>
              ))}
            </div>
            
            <button 
              className={styles.arrowRight} 
              onClick={() => scrollRight(testimonialsRef)}
            >
              <FaChevronRight />
            </button>
          </div>
        </section>
        
        <section className={styles.contactSection}>
          <div className={styles.sectionHeader}>
            <h2>Contact Information</h2>
          </div>
          
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email:</span>
              <span className={styles.contactValue}>{groupData.contactEmail}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Phone:</span>
              <span className={styles.contactValue}>{groupData.contactPhone}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Website:</span>
              <a href={`https://${groupData.website}`} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                {groupData.website}
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Instagram:</span>
              <a href={groupData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                {groupData.instaHandle}
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}