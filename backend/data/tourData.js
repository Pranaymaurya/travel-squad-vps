const data = [
  {
    id: 1,
    title: "Mountain",
    types: [
      {
        id: 1,
        name: "Haridwar",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
        price: "$50 per person",
        rating: 5,
        reviews: 100,
        location: "Haridwar, Uttrakhand",
        duration: "10 Days",
        title: "Mountain",
        "photos": [
          {
            "src": "https://images.unsplash.com/photo-1624358084630-f0880cb776a2?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            "src": "https://images.unsplash.com/photo-1563124155-dbc34ba9bedb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGFyaWR3YXJ8ZW58MHx8MHx8fDA%3D"
          },
          {
            "src": "https://media.istockphoto.com/id/1005227506/photo/har-ki-pauri-is-a-famous-ghat-on-the-banks-of-the-ganges-in-haridwar-india.jpg?s=1024x1024&w=is&k=20&c=ogligY6KGUvn3-OUZ2d49Dk-wnu0CXf6wYddSYNaC2E="
          },
          {
            "src": "https://media.istockphoto.com/id/1044399860/photo/ganga-arthi-in-the-holy-city-of-rishikesh-in-uttarakhand-india-to-worship-river-ganga-ganges.jpg?s=1024x1024&w=is&k=20&c=H4n93UJhR8LPsa_aQdnv1A_BbGWVCQBjf-_mYMvIC44="
          },
          {
            "src": "https://media.istockphoto.com/id/1752927325/photo/lord-shiva-statue-on-the-banks-of-the-sacred-ganges-river-in-rishikesh-india.jpg?s=1024x1024&w=is&k=20&c=v6dsl2iSWOP02bnQg6dzNZI7V86odf5Eu6OemV4v6TU="
          },
          {
            "src": "https://media.istockphoto.com/id/825268350/photo/hardiwar.webp?b=1&s=170667a&w=0&k=20&c=O2GgcESUTZp-GfprLRKPX8OXWN_kr_fZ-31YB1NRduA="
          }
        ],
        inclusions: [
          "Meal as per hotel Plan and drinks free too",
          "Return airport and round trip transfers",
          "Accommodation on twin sharing basis",
          "Enjoy Brussels day tours. Overnight Brussels",
        ],
          "tourPlan": [
          {
            "day": 1,
            "name": "City Highlights",
            "description": "Visit the city's main landmarks including museums, parks, and historical sites.",
            "car": [
              {
                "destination": "New Delhi to Haridwar",
                "type": "Private Transport",
                "model": "Swift",
                "facilities": "3 seater, 2 Luggage Bags, First Aid",
                "image": "https://images.unsplash.com/photo-1511125357779-27038c647d9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGNhcnxlbnwwfHwwfHx8MA%3D%3D"
              }
            ],
            "sightseeing": [
              {
                "name": "Haridwar",
                "location": "Haridwar, India",
                "places": ["Har Ki Pauri", "Chandi Devi", "Mansa Devi"],
                "duration": "4 hr",
                "placesCovered": 3,
                "image": "https://images.unsplash.com/photo-1511754863001-18d44abd0a93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFyaWR3YXJ8ZW58MHx8MHx8fDA%3D"
              }
            ],
            "hotels": [
              {
                "timming": "Check-in to Hotel in Near Shiv Murti Chowk @ 12 PM",
                "name": "Umra Grace Hotel",
                "ratings": "3",
                "location": "near Shiv Murti Chowk",
                "stayDate": "9th Aug 2024 - 10th Aug 2024",
                "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww"
              }
            ]
          },
          {
            "day": 2,
            "name": "Cultural Experience",
            "description": "Explore the local culture through food, music, and art.",
            "car": [
              {
                "checkout": "Checkout from Hotel in Haridwar",
                "destination": "Haridwar to Rishikesh",
                "type": "private transport",
                "model": "swift",
                "facilities": "3 seater, 2 Luggage Bags, First Aid",
                "image": "https://images.unsplash.com/photo-1511125357779-27038c647d9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGNhcnxlbnwwfHwwfHx8MA%3D%3D"
              }
            ],
            "sightseeing": [
              {
                "name": "Rishikesh",
                "location": "Rishikesh, India",
                "places": ["Bharat Mandir", "Parmarth Niketan", "Ram Jhula"],
                "duration": "3 hr",
                "placesCovered": 3,
                "image": "https://images.unsplash.com/photo-1588750765220-50603c3c0c7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFyaWR3YXJ8ZW58MHx8MHx8fDA%3D"
              }
            ],
            "hotels": [
              {
                "timming": "Check-in to Hotel in Tapovan @ 2 PM",
                "name": "Hotel Rishikesh Grand",
                "ratings": "3.5",
                "location": "Tapovan",
                "stayDate": "10th Aug 2024 - 11th Aug 2024",
                "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww"
              }
            ]
          },
          {
            "day": 3,
            "name": "Cultural Experience",
            "description": "Explore the local culture through food, music, and art.",
            "car": [
              {
                "checkout": "Checkout from Hotel in Rishikesh",
                "destination": "Rishikesh to Mussoorie",
                "type": "Private transport",
                "model": "Swift",
                "facilities": "3 seater, 2 Luggage Bags, First Aid",
                "image": "https://images.unsplash.com/photo-1511125357779-27038c647d9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGNhcnxlbnwwfHwwfHx8MA%3D%3D"
              }
            ],
            "hotels": [
              {
                "timming": "Check-in to Hotel in Near Picture Palace Bus Stand @ 2 PM",
                "name": "Umra Grace Hotel",
                "ratings": "3",
                "location": "near Shiv Murti Chowk",
                "stayDate": "9th Aug 2024 - 10th Aug 2024",
                "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Ladakh",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
        image: "https://source.unsplash.com/random",
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
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
        image: "https://source.unsplash.com/random",
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
    image: "https://source.unsplash.com/random",
  },
  {
    id: 2,
    title: "Beach",
    types: [
      {
        id: 1,
        name: "Goa",
        description:
          "Enjoy the sun, sand, and sea in the tropical paradise of Goa.",
        image: "https://source.unsplash.com/random",
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
        description:
          "Experience the beauty of the tropical paradise of Maldives.",
        image: "https://source.unsplash.com/random",
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
        description:
          "Explore the stunning beaches and lively nightlife of Phuket.",
        image: "https://source.unsplash.com/random",
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
    image: "https://source.unsplash.com/random",
  },
  {
    id: 3,
    title: "Desert",
    types: [
      {
        id: 1,
        name: "Sahara-Desert",
        description: "Experience the vastness and beauty of the Sahara Desert.",
        image: "https://source.unsplash.com/random",
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
        description: "Experience the beauty and majesty of the Gobi Desert.",
        image: "https://source.unsplash.com/random",
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
    image: "https://source.unsplash.com/random",
  },
  {
    id: 4,
    title: "Camping",
    types: [
      {
        id: 1,
        name: "Camping",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna id dolor elementum ultrices.",
        image: "https://source.unsplash.com/random",
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
