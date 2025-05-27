import TripDetails from '@/components/TripDetails';

async function getTripData(id) {
  try {
    const response = await fetch('https://travel-rozf.onrender.com/core/trips/');
    if (!response.ok) {
      throw new Error('Failed to fetch trips');
    }
    const allTrips = await response.json();

    const currentTrip = allTrips.find(trip => trip.id === parseInt(id));
    
    if (!currentTrip) {
      throw new Error('Trip not found');
    }

    const similarTrips = allTrips.filter(trip => 
      trip.destination === currentTrip.destination && trip.id !== currentTrip.id
    );

    const rating = (Math.random() * 1 + 4).toFixed(1);
    const reviews = Math.floor(Math.random() * 490) + 10;

    const processedTrip = {
      id: currentTrip.id,
      name: currentTrip.trip_spot || 'Not Available',
      location: currentTrip.destination || 'Not Available',
      rating: parseFloat(rating),
      reviews: reviews,
      price: currentTrip.price || 'Not Available',
      duration: currentTrip.duration || 'Not Available',
      description: currentTrip.description || 'No description available',
      images: currentTrip.trip_image?.map(img => img.image) || ['/images/default-trip.jpg'],
      organizer: currentTrip.group_name || 'Not Available'
    };

     const comparisonData = similarTrips.map(trip => {
      return {
        organizer: trip.group_name || 'Unknown Organizer',
        name: trip.trip_spot || 'Unknown Trip',
        price: parseFloat(trip.price),
        originalPrice: null
      };
    });

    comparisonData.unshift({
      organizer: currentTrip.group_name || 'Current Organizer',
      name: currentTrip.trip_spot || 'Current Trip',
      price: parseFloat(currentTrip.price),
      originalPrice: null
    });

    return {
      trip: processedTrip,
      comparisonData: comparisonData
    };
  } catch (error) {
    console.error('Error fetching trip data:', error);
    throw error;
  }
}

export default async function TripPage({ params }) {
  // Await params before accessing its properties
  const resolvedParams = await params;
  const { trip, comparisonData } = await getTripData(resolvedParams.id);
  
  return (
    <div>
      <TripDetails trip={trip} comparisonData={comparisonData} />
    </div>
  );
}