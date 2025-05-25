// src/app/trips/[id]/page.js
import TripDetails from '@/components/TripDetails';

// Sample data fetching (replace with your actual data source)
async function getTripData(id) {
  // This is where you'd fetch data from your API
  // In a real app, replace this with your actual data fetching logic
  
  // For now, using sample data
  const tripData = {
    id: parseInt(id),
    name: "Nandi Hills Sunrise Trek",
    location: "Nandi Village, Chikkaballapur",
    rating: 4.7,
    reviews: 153,
    price: 349,
    originalPrice: 498,
    discount: "30% OFF",
    duration: "1D / 1N",
    category: "Sunrise Treks",
    minAge: "5+",
    taxInfo: "No Hidden Charges",
    organizer: "escape2explore",
    images: [
      "/images/nandi.png",
      "/images/nandi1.png",
      "/images/nandi2.png",
    ],
    description: "Experience the breathtaking sunrise at Nandi Hills, one of the most popular weekend getaways from Bangalore. This early morning trek offers panoramic views of the surrounding landscapes covered in mist.",
    highlights: [
      "Witness spectacular sunrise views from 1,478m elevation",
      "Trek through refreshing morning mist and clouds",
      "Explore ancient temples and historical structures",
      "Perfect for beginners and families with kids above 5 years",
      "Guided experience with photography opportunities"
    ],
    inclusions: [
      "Professional trek guide",
      "Basic first aid",
      "Entry fees",
      "Breakfast"
    ],
    exclusions: [
      "Transportation to and from Nandi Hills",
      "Personal expenses",
      "Any meals not mentioned",
      "Insurance"
    ]
  };
  
  return tripData;
}

export default async function TripPage({ params }) {
  const tripData = await getTripData(params.id);
  
  return (
    <div>
      <TripDetails trip={tripData} />
    </div>
  );
}