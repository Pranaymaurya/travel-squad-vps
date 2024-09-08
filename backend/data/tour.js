const tours = [
  {
    name: "Haridwar",
    type: "Mountain",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
    price: 5000,
    rating: 5,
    image: "/uploads/tour4.jpg",
    reviews: 100,
    location: "Haridwar, Uttrakhand",
    duration: "10 Days",
    photos: [
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
      "/uploads/tour3.jpg",
      "/uploads/tour4.jpg",
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
    ],
    inclusions: [
      "Meal as per hotel Plan and drinks free too",
      "Return airport and round trip transfers",
      "Accommodation on twin sharing basis",
      "Enjoy Brussels day tours. Overnight Brussels",
    ],
    availableFrom: new Date("2024-07-01"),
    availableTill: new Date("2024-08-30"),
    featured: false,
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Haridwar",
            location: "Haridwar, India",
            places: "Har Ki Pauri, Chandi Devi, Mansa Devi",
            duration: "4 hr",
            placesCovered: 3,
            image: "/uploads/tour2.jpg",
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel in Near Shiv Murti Chowk @ 12 PM",
            name: "Umra Grace Hotel",
            ratings: "3",
            location: "near Shiv Murti Chowk",
            stayDate: "9th Aug 2024 - 10th Aug 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Rishikesh",
            location: "Rishikesh, India",
            places: "Bharat Mandir, Parmarth Niketan, Ram Jhula",
            duration: "3 hr",
            placesCovered: 3,
            image: "/uploads/tour2.jpg",
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel in Tapovan @ 2 PM",
            name: "Hotel Rishikesh Grand",
            ratings: "3.5",
            location: "Tapovan",
            stayDate: "10th Aug 2024 - 11th Aug 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
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
            image: "/uploads/hotel5.avif",
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
    price: 10000,
    rating: 4.5,
    image: "/uploads/tour3.jpg",
    reviews: 150,
    location: "Manali, Himachal Pradesh",
    duration: "7 Days",
    photos: [
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
      "/uploads/tour3.jpg",
      "/uploads/tour4.jpg",
    ],
    inclusions: [
      "Breakfast and Dinner",
      "Airport Transfers",
      "Accommodation in 3-star hotels",
      "Guided local tours",
    ],
    availableFrom: new Date("2024-08-01"),
    availableTill: new Date("2024-09-30"),
    featured: true,
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Manali",
            location: "Manali, India",
            places: "Hidimba Temple, Solang Valley, Mall Road",
            duration: "5 hr",
            placesCovered: 3,
            image: "/uploads/tour3.jpg",
          }
        ],
        hotels: [
          {
            timming: "Check-in to Hotel @ 2 PM",
            name: "Hotel Manali Heights",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "1st Sep 2024 - 2nd Sep 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Solang Valley",
            location: "Solang Valley, Manali",
            places: "Paragliding, Skiing, Zorbing",
            duration: "6 hr",
            placesCovered: 3,
            image: "/uploads/tour2.jpg",
          },
        ],
        hotels: [
          {
            timming: "Return to Hotel @ 6 PM",
            name: "Hotel Manali Heights",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "2nd Sep 2024 - 3rd Sep 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        hotels: [
          {
            timming: "Check-out from Hotel @ 11 AM",
            name: "Hotel Manali Heights",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "3rd Sep 2024",
            image: "/uploads/hotel5.avif",
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
    price: 1500,
    rating: 4,
    image: "/uploads/tour1.jpg",
    reviews: 120,
    location: "Shimla, Himachal Pradesh",
    duration: "5 Days",
    photos: [
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
      "/uploads/tour3.jpg",
      "/uploads/tour4.jpg",
    ],
    inclusions: [
      "Breakfast and Dinner",
      "Airport Transfers",
      "Accommodation in 3-star hotels",
      "Guided local tours",
    ],
    availableFrom: new Date("2024-09-01"),
    availableTill: new Date("2024-10-30"),
    featured: false,
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Shimla",
            location: "Shimla, India",
            places: "The Ridge, Mall Road, Christ Church",
            duration: "4 hr",
            placesCovered: 3,
            image: "/uploads/tour1.jpg",
          }
        ],
        hotels: [
          {
            timming: "Check-in to Hotel @ 2 PM",
            name: "Hotel Willow Banks",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "5th Sep 2024 - 6th Sep 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Viceregal Lodge",
            location: "Shimla, India",
            places: "Viceregal Lodge, Jakhu Temple, Lakkar Bazaar",
            duration: "6 hr",
            placesCovered: 3,
            image: "/uploads/tour3.jpg",
          },
        ],
        hotels: [
          {
            timming: "Return to Hotel @ 6 PM",
            name: "Hotel Willow Banks",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "6th Sep 2024 - 7th Sep 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        hotels: [
          {
            timming: "Check-out from Hotel @ 11 AM",
            name: "Hotel Willow Banks",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "7th Sep 2024",
            image: "/uploads/hotel5.avif",
          },
        ],
      },
    ],
  },
  {
    name: "Goa",
    type: "Beach",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
    price: 20000,
    rating: 5,
    image: "/uploads/tour4.jpg",
    reviews: 100,
    location: "Haridwar, Uttrakhand",
    duration: "10 Days",
    photos: [
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
      "/uploads/tour3.jpg",
      "/uploads/tour4.jpg",
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
    ],
    inclusions: [
      "Meal as per hotel Plan and drinks free too",
      "Return airport and round trip transfers",
      "Accommodation on twin sharing basis",
      "Enjoy Brussels day tours. Overnight Brussels",
    ],
    availableFrom: new Date("2024-10-01"),
    availableTill: new Date("2024-11-30"),
    featured: true,
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Haridwar",
            location: "Haridwar, India",
            places: "Har Ki Pauri, Chandi Devi, Mansa Devi",
            duration: "4 hr",
            placesCovered: 3,
            image: "/uploads/tour2.jpg",
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel in Near Shiv Murti Chowk @ 12 PM",
            name: "Umra Grace Hotel",
            ratings: "3",
            location: "near Shiv Murti Chowk",
            stayDate: "9th Aug 2024 - 10th Aug 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Rishikesh",
            location: "Rishikesh, India",
            places: "Bharat Mandir, Parmarth Niketan, Ram Jhula",
            duration: "3 hr",
            placesCovered: 3,
            image: "/uploads/tour2.jpg",
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel in Tapovan @ 2 PM",
            name: "Hotel Rishikesh Grand",
            ratings: "3.5",
            location: "Tapovan",
            stayDate: "10th Aug 2024 - 11th Aug 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
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
            image: "/uploads/hotel5.avif",
          },
        ],
      },
    ],
  },
  {
    name: "Maldives",
    type: "Beach",
    description:
      "Manali is a beautiful hill station nestled in the Himalayas, known for its scenic beauty and adventure activities.",
    price: 25000,
    rating: 4.5,
    image: "/uploads/tour3.jpg",
    reviews: 150,
    location: "Manali, Himachal Pradesh",
    duration: "7 Days",
    photos: [
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
      "/uploads/tour3.jpg",
      "/uploads/tour4.jpg",
    ],
    inclusions: [
      "Breakfast and Dinner",
      "Airport Transfers",
      "Accommodation in 3-star hotels",
      "Guided local tours",
    ],
    availableFrom: new Date("2024-11-01"),
    availableTill: new Date("2024-12-30"),
    featured: false,
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Manali",
            location: "Manali, India",
            places: "Hidimba Temple, Solang Valley, Mall Road",
            duration: "5 hr",
            placesCovered: 3,
            image: "/uploads/tour3.jpg",
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel @ 2 PM",
            name: "Hotel Manali Heights",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "1st Sep 2024 - 2nd Sep 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Solang Valley",
            location: "Solang Valley, Manali",
            places: "Paragliding, Skiing, Zorbing",
            duration: "6 hr",
            placesCovered: 3,
            image: "/uploads/tour2.jpg",
          },
        ],
        hotels: [
          {
            timming: "Return to Hotel @ 6 PM",
            name: "Hotel Manali Heights",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "2nd Sep 2024 - 3rd Sep 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        hotels: [
          {
            timming: "Check-out from Hotel @ 11 AM",
            name: "Hotel Manali Heights",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "3rd Sep 2024",
            image: "/uploads/hotel5.avif",
          },
        ],
      },
    ],
  },
  {
    name: "Phuket",
    type: "Beach",
    description:
      "Shimla, the capital of Himachal Pradesh, is known for its colonial architecture and scenic views.",
    price: 30000,
    rating: 4,
    image: "/uploads/tour1.jpg",
    reviews: 120,
    location: "Shimla, Himachal Pradesh",
    duration: "5 Days",
    photos: [
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
      "/uploads/tour3.jpg",
      "/uploads/tour4.jpg",
    ],
    inclusions: [
      "Breakfast and Dinner",
      "Airport Transfers",
      "Accommodation in 3-star hotels",
      "Guided local tours",
    ],
    availableFrom: new Date("2024-07-01"),
    availableTill: new Date("2024-08-30"),
    featured: true,
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Shimla",
            location: "Shimla, India",
            places: "The Ridge, Mall Road, Christ Church",
            duration: "4 hr",
            placesCovered: 3,
            image: "/uploads/tour1.jpg",
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel @ 2 PM",
            name: "Hotel Willow Banks",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "5th Sep 2024 - 6th Sep 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Viceregal Lodge",
            location: "Shimla, India",
            places: "Viceregal Lodge, Jakhu Temple, Lakkar Bazaar",
            duration: "6 hr",
            placesCovered: 3,
            image: "/uploads/tour3.jpg",
          },
        ],
        hotels: [
          {
            timming: "Return to Hotel @ 6 PM",
            name: "Hotel Willow Banks",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "6th Sep 2024 - 7th Sep 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        hotels: [
          {
            timming: "Check-out from Hotel @ 11 AM",
            name: "Hotel Willow Banks",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "7th Sep 2024",
            image: "/uploads/hotel5.avif",
          },
        ],
      },
    ],
  },
  {
    name: "Sahara",
    type: "Desert",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
    price: 35000,
    rating: 5,
    image: "/uploads/tour4.jpg",
    reviews: 100,
    location: "Haridwar, Uttrakhand",
    duration: "10 Days",
    photos: [
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
      "/uploads/tour3.jpg",
      "/uploads/tour4.jpg",
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
    ],
    inclusions: [
      "Meal as per hotel Plan and drinks free too",
      "Return airport and round trip transfers",
      "Accommodation on twin sharing basis",
      "Enjoy Brussels day tours. Overnight Brussels",
    ],
    availableFrom: new Date("2024-08-01"),
    availableTill: new Date("2024-09-30"),
    featured: false,
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Haridwar",
            location: "Haridwar, India",
            places: "Har Ki Pauri, Chandi Devi, Mansa Devi",
            duration: "4 hr",
            placesCovered: 3,
            image: "/uploads/tour2.jpg",
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel in Near Shiv Murti Chowk @ 12 PM",
            name: "Umra Grace Hotel",
            ratings: "3",
            location: "near Shiv Murti Chowk",
            stayDate: "9th Aug 2024 - 10th Aug 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Rishikesh",
            location: "Rishikesh, India",
            places: "Bharat Mandir, Parmarth Niketan, Ram Jhula",
            duration: "3 hr",
            placesCovered: 3,
            image: "/uploads/tour2.jpg",
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel in Tapovan @ 2 PM",
            name: "Hotel Rishikesh Grand",
            ratings: "3.5",
            location: "Tapovan",
            stayDate: "10th Aug 2024 - 11th Aug 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
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
            image: "/uploads/hotel5.avif",
          },
        ],
      },
    ],
  },
  {
    name: "Gobi",
    type: "Desert",
    description:
      "Manali is a beautiful hill station nestled in the Himalayas, known for its scenic beauty and adventure activities.",
    price: 40000,
    rating: 4.5,
    image: "/uploads/tour3.jpg",
    reviews: 150,
    location: "Manali, Himachal Pradesh",
    duration: "7 Days",
    photos: [
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
      "/uploads/tour3.jpg",
      "/uploads/tour4.jpg",
    ],
    inclusions: [
      "Breakfast and Dinner",
      "Airport Transfers",
      "Accommodation in 3-star hotels",
      "Guided local tours",
    ],
    availableFrom: new Date("2024-09-01"),
    availableTill: new Date("2024-10-30"),
    featured: true,
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Manali",
            location: "Manali, India",
            places: "Hidimba Temple, Solang Valley, Mall Road",
            duration: "5 hr",
            placesCovered: 3,
            image: "/uploads/tour3.jpg",
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel @ 2 PM",
            name: "Hotel Manali Heights",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "1st Sep 2024 - 2nd Sep 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Solang Valley",
            location: "Solang Valley, Manali",
            places: "Paragliding, kiing, Zorbing",
            duration: "6 hr",
            placesCovered: 3,
            image: "/uploads/tour2.jpg",
          },
        ],
        hotels: [
          {
            timming: "Return to Hotel @ 6 PM",
            name: "Hotel Manali Heights",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "2nd Sep 2024 - 3rd Sep 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        hotels: [
          {
            timming: "Check-out from Hotel @ 11 AM",
            name: "Hotel Manali Heights",
            ratings: "4",
            location: "Near Mall Road",
            stayDate: "3rd Sep 2024",
            image: "/uploads/hotel5.avif",
          },
        ],
      },
    ],
  },
  {
    name: "Dare-Devil",
    type: "Camping",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
    price: 45000,
    rating: 5,
    image: "/uploads/tour4.jpg",
    reviews: 100,
    location: "Haridwar, Uttrakhand",
    duration: "10 Days",
    photos: [
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
      "/uploads/tour3.jpg",
      "/uploads/tour4.jpg",
      "/uploads/tour1.jpg",
      "/uploads/tour2.jpg",
    ],
    inclusions: [
      "Meal as per hotel Plan and drinks free too",
      "Return airport and round trip transfers",
      "Accommodation on twin sharing basis",
      "Enjoy Brussels day tours. Overnight Brussels",
    ],
    availableFrom: new Date("2024-10-01"),
    availableTill: new Date("2024-11-30"),
    featured: false,
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Haridwar",
            location: "Haridwar, India",
            places: "Har Ki Pauri, Chandi Devi, Mansa Devi",
            duration: "4 hr",
            placesCovered: 3,
            image: "/uploads/tour2.jpg",
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel in Near Shiv Murti Chowk @ 12 PM",
            name: "Umra Grace Hotel",
            ratings: "3",
            location: "near Shiv Murti Chowk",
            stayDate: "9th Aug 2024 - 10th Aug 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
          },
        ],
        sightseeing: [
          {
            name: "Rishikesh",
            location: "Rishikesh, India",
            places: "Bharat Mandir, Parmarth Niketan, ram Jhula",
            duration: "3 hr",
            placesCovered: 3,
            image: "/uploads/tour2.jpg",
          },
        ],
        hotels: [
          {
            timming: "Check-in to Hotel in Tapovan @ 2 PM",
            name: "Hotel Rishikesh Grand",
            ratings: "3.5",
            location: "Tapovan",
            stayDate: "10th Aug 2024 - 11th Aug 2024",
            image: "/uploads/hotel5.avif",
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
            image: "/uploads/car1.avif",
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
            image: "/uploads/hotel5.avif",
          },
        ],
      },
    ],
  },
];

export default tours;
