import tour1 from "../../assets/tour1.jpg";
import tour2 from "../../assets/tour2.jpg";
import tour3 from "../../assets/tour3.jpg";
import tour4 from "../../assets/tour4.jpg";
import car1 from "../../assets/car1.avif";
import hotel5 from "../../assets/hotel5.avif";

const data = [
  {
    name: "Haridwar",
    type: "Mountain",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
    price: 50,
    rating: 5,
    image: tour4,
    reviews: 100,
    location: "Haridwar, Uttrakhand",
    duration: "10 Days",
    photos: [tour1, tour2, tour3, tour4, tour1, tour2],
    inclusions: [
      "Meal as per hotel Plan and drinks free too",
      "Return airport and round trip transfers",
      "Accommodation on twin sharing basis",
      "Enjoy Brussels day tours. Overnight Brussels",
    ],
    tourPlan: [
      {
        day: 1,
        description: "City Highlights",
        car: [
          {
            destination: "New Delhi to Haridwar",
            type: "Private Transport",
            model: "Swift",
            facilities: "3 seater, 2 Luggage Bags, First Aid",
            image: car1,
          },
        ],
        sightseeing: [
          {
            name: "Haridwar",
            location: "Haridwar, India",
            places: ["Har Ki Pauri", "Chandi Devi", "Mansa Devi"],
            duration: "4 hr",
            placesCovered: 3,
            image: tour2,
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel in Near Shiv Murti Chowk @ 12 PM",
            name: "Umra Grace Hotel",
            ratings: "3",
            location: "near Shiv Murti Chowk",
            stayDate: "9th Aug 2024 - 10th Aug 2024",
            image: hotel5,
          },
        ],
      },
      {
        day: 2,
        description: "Cultural Experience",
        car: [
          {
            checkout: "Checkout from Hotel in Haridwar",
            destination: "Haridwar to Rishikesh",
            type: "private transport",
            model: "swift",
            facilities: "3 seater, 2 Luggage Bags, First Aid",
            image: car1,
          },
        ],
        sightseeing: [
          {
            name: "Rishikesh",
            location: "Rishikesh, India",
            places: ["Bharat Mandir", "Parmarth Niketan", "Ram Jhula"],
            duration: "3 hr",
            placesCovered: 3,
            image: tour2,
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel in Tapovan @ 2 PM",
            name: "Hotel Rishikesh Grand",
            ratings: "3.5",
            location: "Tapovan",
            stayDate: "10th Aug 2024 - 11th Aug 2024",
            image: hotel5,
          },
        ],
      },
      {
        day: 3,
        description: "Cultural Experience",
        car: [
          {
            checkout: "Checkout from Hotel in Rishikesh",
            destination: "Rishikesh to Mussoorie",
            type: "Private transport",
            model: "Swift",
            facilities: "3 seater, 2 Luggage Bags, First Aid",
            image: car1,
          },
        ],
        hotels: [
          {
            timming:
              "Check-in to Hotel in Near Picture Palace Bus Stand @ 2 PM",
            name: "Umra Grace Hotel",
            ratings: "3",
            location: "near Shiv Murti Chowk",
            stayDate: "9th Aug 2024 - 10th Aug 2024",
            image: hotel5,
          },
        ],
      },
    ],
  },
  {
    name: "Manali",
    type: "Mountain",
    description:
      "Manali is a beautiful hill station nestled in the Himalayas, known for its scenic beauty and adventure activities.",
    price: 60,
    rating: 4.5,
    image: tour3,
    reviews: 150,
    location: "Manali, Himachal Pradesh",
    duration: "7 Days",
    photos: [tour1, tour2, tour3, tour4],
    inclusions: [
      "Breakfast and Dinner",
      "Airport Transfers",
      "Accommodation in 3-star hotels",
      "Guided local tours",
    ],
    tourPlan: [
      {
        day: 1,
        description: "Arrival in Manali",
        car: [
          {
            destination: "Delhi to Manali",
            type: "Private Transport",
            model: "Innova",
            facilities: "6 seater, 4 Luggage Bags, First Aid",
            image: car1,
          },
        ],
        sightseeing: [
          {
            name: "Manali",
            location: "Manali, India",
            places: ["Hidimba Temple", "Solang Valley", "Mall Road"],
            duration: "5 hr",
            placesCovered: 3,
            image: tour3,
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel @ 2 PM",
            name: "Hotel Manali Heights",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "1st Sep 2024 - 2nd Sep 2024",
            image: hotel5,
          },
        ],
      },
      {
        day: 2,
        description: "Adventure Activities",
        car: [
          {
            destination: "Manali local tour",
            type: "Private Transport",
            model: "Innova",
            facilities: "6 seater, 4 Luggage Bags, First Aid",
            image: car1,
          },
        ],
        sightseeing: [
          {
            name: "Solang Valley",
            location: "Solang Valley, Manali",
            places: ["Paragliding", "Skiing", "Zorbing"],
            duration: "6 hr",
            placesCovered: 3,
            image: tour2,
          },
        ],
        hotels: [
          {
            timming: "Return to Hotel @ 6 PM",
            name: "Hotel Manali Heights",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "2nd Sep 2024 - 3rd Sep 2024",
            image: hotel5,
          },
        ],
      },
      {
        day: 3,
        description: "Departure from Manali",
        car: [
          {
            checkout: "Checkout from Hotel",
            destination: "Manali to Delhi",
            type: "Private Transport",
            model: "Innova",
            facilities: "6 seater, 4 Luggage Bags, First Aid",
            image: car1,
          },
        ],
        hotels: [
          {
            timming: "Check-out from Hotel @ 11 AM",
            name: "Hotel Manali Heights",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "3rd Sep 2024",
            image: hotel5,
          },
        ],
      },
    ],
  },
  {
    name: "Shimla",
    type: "Mountain",
    description:
      "Shimla, the capital of Himachal Pradesh, is known for its colonial architecture and scenic views.",
    price: 55,
    rating: 4,
    image: tour1,
    reviews: 120,
    location: "Shimla, Himachal Pradesh",
    duration: "5 Days",
    photos: [tour1, tour2, tour3, tour4],
    inclusions: [
      "Breakfast and Dinner",
      "Airport Transfers",
      "Accommodation in 3-star hotels",
      "Guided local tours",
    ],
    tourPlan: [
      {
        day: 1,
        description: "Arrival in Shimla",
        car: [
          {
            destination: "Delhi to Shimla",
            type: "Private Transport",
            model: "Innova",
            facilities: "6 seater, 4 Luggage Bags, First Aid",
            image: car1,
          },
        ],
        sightseeing: [
          {
            name: "Shimla",
            location: "Shimla, India",
            places: ["The Ridge", "Mall Road", "Christ Church"],
            duration: "4 hr",
            placesCovered: 3,
            image: tour1,
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel @ 2 PM",
            name: "Hotel Willow Banks",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "5th Sep 2024 - 6th Sep 2024",
            image: hotel5,
          },
        ],
      },
      {
        day: 2,
        description: "Heritage Walk",
        car: [
          {
            destination: "Shimla local tour",
            type: "Private Transport",
            model: "Innova",
            facilities: "6 seater, 4 Luggage Bags, First Aid",
            image: car1,
          },
        ],
        sightseeing: [
          {
            name: "Viceregal Lodge",
            location: "Shimla, India",
            places: ["Viceregal Lodge", "Jakhu Temple", "Lakkar Bazaar"],
            duration: "6 hr",
            placesCovered: 3,
            image: tour3,
          },
        ],
        hotels: [
          {
            timming: "Return to Hotel @ 6 PM",
            name: "Hotel Willow Banks",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "6th Sep 2024 - 7th Sep 2024",
            image: hotel5,
          },
        ],
      },
      {
        day: 3,
        description: "Departure from Shimla",
        car: [
          {
            checkout: "Checkout from Hotel",
            destination: "Shimla to Delhi",
            type: "Private Transport",
            model: "Innova",
            facilities: "6 seater, 4 Luggage Bags, First Aid",
            image: car1,
          },
        ],
        hotels: [
          {
            timming: "Check-out from Hotel @ 11 AM",
            name: "Hotel Willow Banks",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "7th Sep 2024",
            image: hotel5,
          },
        ],
      },
    ],
  },
  {
    name: "Nainital",
    type: "Mountain",
    description:
      "Nainital, a popular hill station in Uttarakhand, is known for its scenic beauty and the Naini Lake.",
    price: 45,
    rating: 4.2,
    image: tour2,
    reviews: 130,
    location: "Nainital, Uttarakhand",
    duration: "6 Days",
    photos: [tour1, tour2, tour3, tour4],
    inclusions: [
      "Breakfast and Dinner",
      "Airport Transfers",
      "Accommodation in 3-star hotels",
      "Guided local tours",
    ],
    tourPlan: [
      {
        day: 1,
        description: "Arrival in Nainital",
        car: [
          {
            destination: "Delhi to Nainital",
            type: "Private Transport",
            model: "Innova",
            facilities: "6 seater, 4 Luggage Bags, First Aid",
            image: car1,
          },
        ],
        sightseeing: [
          {
            name: "Nainital",
            location: "Nainital, India",
            places: ["Naini Lake", "Naina Devi Temple", "Snow View Point"],
            duration: "5 hr",
            placesCovered: 3,
            image: tour2,
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel @ 2 PM",
            name: "Hotel Naini Retreat",
            ratings: "4.2",
            location: "Near Naini Lake",
            stayDate: "10th Sep 2024 - 11th Sep 2024",
            image: hotel5,
          },
        ],
      },
      {
        day: 2,
        description: "Local Exploration",
        car: [
          {
            destination: "Nainital local tour",
            type: "Private Transport",
            model: "Innova",
            facilities: "6 seater, 4 Luggage Bags, First Aid",
            image: car1,
          },
        ],
        sightseeing: [
          {
            name: "Nainital Zoo",
            location: "Nainital, India",
            places: ["Nainital Zoo", "Eco Cave Gardens", "Mall Road"],
            duration: "6 hr",
            placesCovered: 3,
            image: tour3,
          },
        ],
        hotels: [
          {
            timming: "Return to Hotel @ 6 PM",
            name: "Hotel Naini Retreat",
            ratings: "4.2",
            location: "Near Naini Lake",
            stayDate: "11th Sep 2024 - 12th Sep 2024",
            image: hotel5,
          },
        ],
      },
      {
        day: 3,
        description: "Departure from Nainital",
        car: [
          {
            checkout: "Checkout from Hotel",
            destination: "Nainital to Delhi",
            type: "Private Transport",
            model: "Innova",
            facilities: "6 seater, 4 Luggage Bags, First Aid",
            image: car1,
          },
        ],
        hotels: [
          {
            timming: "Check-out from Hotel @ 11 AM",
            name: "Hotel Naini Retreat",
            ratings: "4.2",
            location: "Near Naini Lake",
            stayDate: "12th Sep 2024",
            image: hotel5,
          },
        ],
      },
    ],
  },
];

export default data;
