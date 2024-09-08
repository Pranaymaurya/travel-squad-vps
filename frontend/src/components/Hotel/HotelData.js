import hotel from '../../assets/hotel5.avif'
const data = [
    {
      id: 1,
      title: "Mountain",
      types: [
        {
          id: 1,
          name: "Darjeeling",
          no_hotels: 130,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
          image: hotel,
          price: "$50 per person",
          rating: 5,
          reviews: 100,
          location: "Himachal Pradesh",
          duration: "10 Days",
          title: "Mountain",
          inclusions: [
            "Meal as per hotel Plan and drinks free too",
            "Return airport and round trip transfers",
            "Accommodation on twin sharing basis",
            "Enjoy Brussels day tours. Overnight Brussels",
          ],
          tourPlan: [
            {
              day: 1,
              name: "City Highlights",
              description:
                "Visit the city's main landmarks including museums, parks, and historical sites.",
            },
            {
              day: 2,
              name: "Cultural Experience",
              description:
                "Explore the local culture through food, music, and art.",
            },
            {
              day: 3,
              name: "Cultural Experience",
              description:
                "Explore the local culture through food, music, and art.",
            },
          ],
        },
        {
          id: 2,
          name: "Ooty",
          no_hotels: 130,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
          image: hotel,
          price: "$1000 per person",
          rating: 4.8,
          reviews: 120,
          location: "Jammu and Kashmir",
          duration: "7 Days",
          title: "Mountain",
  
          inclusions: [
            "Accommodation in traditional Ladakhi homes",
            "Guided trekking expeditions",
            "Visits to monasteries and cultural sites",
            "Meals provided",
          ],
          tourPlan: [
            {
              day: 1,
              name: "Arrival and Acclimatization",
              description:
                "Arrive in Ladakh and spend the day acclimatizing to the altitude.",
            },
            {
              day: 2,
              name: "Monastery Visits",
              description:
                "Visit ancient monasteries and learn about Ladakhi culture and religion.",
            },
            {
              day: 3,
              name: "Trekking Expedition",
              description:
                "Embark on a multi-day trek through the stunning Ladakhi landscape.",
            },
          ],
        },
        {
          id: 3,
          name: "Kashmir",
          no_hotels: 30,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
          image: hotel,
          price: "$500 per person",
          rating: 4.5,
          reviews: 80,
          location: "Jammu and Kashmir",
          duration: "6 Days",
          title: "Mountain",
          inclusions: [
            "Accommodation in traditional Ladakhi homes",
            "Guided Trekking expeditions",
            "Visits to monasteries and cultural sites",
            "Meals provided",
          ],
          tourPlan: [
            {
              day: 1,
              name: "Arrival and Acclimatization",
              description:
                "Arrive in Ladakh and spend the day acclimatizing to the altitude.",
            },
            {
              day: 2,
              name: "Monastery Visits",
              description:
                "Visit ancient monasteries and learn about Ladakhi culture and religion.",
            },
          ],
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
      image: hotel,
    },
    {
      id: 2,
      title: "Beach",
      types: [
        {
          id: 1,
          name: "Goa",
          no_hotels: 110,
          description:
            "Enjoy the sun, sand, and sea in the tropical paradise of Goa.",
          image: hotel,
          price: "$500 per person",
          rating: 4.7,
          reviews: 90,
          location: "Goa, India",
          duration: "5 Days",
          title: "Beach",
          inclusions: [
            "Accommodation in beachfront resorts",
            "Water sports activities",
            "Beachside bonfire dinners",
            "Excursions to nearby attractions",
          ],
          tourPlan: [
            {
              day: 1,
              name: "Beach Relaxation",
              description: "Spend the day relaxing on the sandy beaches of Goa.",
            },
            {
              day: 2,
              name: "Water Sports",
              description:
                "Indulge in thrilling water sports activities like parasailing and jet skiing.",
            },
            {
              day: 3,
              name: "Cultural Exploration",
              description:
                "Explore the rich cultural heritage of Goa through its churches and temples.",
            },
          ],
        },
        {
          id: 2,
          name: "Maldives",
          no_hotels: 50,
          description:
            "Experience the beauty of the tropical paradise of Maldives.",
          image: hotel,
          price: "$600 per person",
          rating: 4.5,
          reviews: 80,
          location: "Maldives, India",
          duration: "7 Days",
          title: "Beach",
          inclusions: [
            "Accommodation in 5-star hotels",
            "Water sports activities",
            "Beachside bonfire dinners",
            "Excursions to nearby attractions",
          ],
          tourPlan: [
            {
              day: 1,
              name: "Beach Relaxation",
              description:
                "Spend the day relaxing on the sandy beaches of Maldives.",
            },
            {
              day: 2,
              name: "Water Sports",
              description:
                "Indulge in thrilling water sports activities like parasailing and jet skiing.",
            },
            {
              day: 3,
              name: "Cultural Exploration",
              description:
                "Explore the rich cultural heritage of Maldives through its churches and temples.",
            },
          ],
        },
        {
          id: 3,
          name: "Phuket",
          no_hotels: 30,
          description:
            "Explore the stunning beaches and lively nightlife of Phuket.",
          image: hotel,
          price: "$600 per person",
          rating: 4.5,
          reviews: 80,
          location: "Phuket, Thailand",
          duration: "6 Days",
          title: "Beach",
          inclusions: [
            "Accommodation in beachfront resorts",
            "Island-hopping tours",
            "Thai cooking classes",
            "Night market visits",
          ],
          tourPlan: [
            {
              day: 1,
              name: "Beach Relaxation",
              description: "Relax and unwind on the beautiful beaches of Phuket.",
            },
            {
              day: 2,
              name: "Island-hopping Adventure",
              description: "Explore nearby islands and discover hidden coves.",
            },
            {
              day: 3,
              name: "Cultural Exploration",
              description:
                "Experience Thai culture through visits to temples and markets.",
            },
          ],
        },
      ],
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      image: hotel,
    },
    {
      id: 3,
      title: "Desert",
      types: [
        {
          id: 1,
          name: "Sahara-Desert",
          no_hotels: 70,
          description: "Experience the vastness and beauty of the Sahara Desert.",
          image: hotel,
          price: "$1200 per person",
          rating: 4.9,
          reviews: 110,
          location: "North Africa",
          title: "Desert",
          duration: "8 Days",
          inclusions: [
            "Accommodation in desert camps",
            "Camel trekking across sand dunes",
            "Sunset and sunrise viewing",
            "Traditional desert meals",
          ],
          tourPlan: [
            {
              day: 1,
              name: "Arrival and Desert Camp",
              description:
                "Arrive in the Sahara and settle into your desert camp.",
            },
            {
              day: 2,
              name: "Camel Trekking",
              description:
                "Embark on a camel trek across the desert, exploring its vast landscapes.",
            },
            {
              day: 3,
              name: "Oasis Visit",
              description: "Visit lush oases nestled amidst the desert sands.",
            },
          ],
        },
        {
          id: 2,
          name: "Gobi Desert",
          no_hotels: 19,
          description: "Experience the beauty and majesty of the Gobi Desert.",
          image: hotel,
          price: "$1200 per person",
          rating: 4.7,
          reviews: 90,
          location: "South Asia",
          title: "Desert",
          duration: "7 Days",
          inclusions: [
            "Accommodation in desert lodges",
            "Water sports activities",
            "Cultural tours",
            "Sunset and sunrise viewing",
          ],
          tourPlan: [
            {
              day: 1,
              name: "Arrival and Desert Camp",
              description:
                "Arrive in the Gobi Desert and settle into your desert camp.",
            },
            {
              day: 2,
              name: "Water Sports",
              description:
                "Experience water sports activities like parasailing and jet skiing.",
            },
          ],
        },
      ],
      description:
        "Sed et urna id dolor elementum ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      image: hotel,
    },
    {
      id: 4,
      title: "Camping",
      types: [
        {
          id: 1,
          name: "Camping",
          no_hotels: 19,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
          image: hotel,
          price: "$1200 per person",
          rating: 4.9,
          reviews: 110,
          location: "North Africa",
          title: "Camping",
          duration: "8 Days",
          inclusions: [
            "Accommodation in desert lodges",
            "Water sports activities",
            "Cultural tours",
            "Sunset and sunrise viewing",
          ],
          tourPlan: [
            {
              day: 1,
              name: "Arrival and Camp",
              description: "Arrive in the desert and settle into your camp.",
            },
            {
              day: 2,
              name: "Camping Activities",
              description:
                "Explore the desert's natural beauty and enjoy outdoor activities.",
            },
          ],
        },
      ],
    },
  ];
  
  export default data;
  