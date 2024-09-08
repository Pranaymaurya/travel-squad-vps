const hotels = [
  {
    imageUrl: "/uploads/hotel1.jpg",
    name: "Goa Marriott Resort & Spa",
    location: "Panjim",
    distance: "2.9 km drive to Deltin Royale",
    category: "Couple Friendly",
    rating: 4.4,
    reviewCount: 1126,
    price: 19600,
    taxes: 3528,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 3,
    type: "hotel",
    amenities: ["spa", "pool"],
    facilities: ["wifi", "games"],
    featured: false,
    hotelPriceHighlight:
      "Book a stay over $114 at this property and get a free airport taxi",
    inclusions: [
      "Free Welcome Drink on Arrival",
      "Complimentary Early Check in",
      "Refundable",
      "Meal Included",
    ],
    foodAndDining: {
      title: "Food and Dining",
      description: [
        "The Square Meal Restaurant has a casual ambience and serves multicuisine food.",
        "Et Cetera Cafe is an all-day eatery and offers a lively ambience enriched by a good playlist of local and global music genres. It has an outdoor space where you can work comfortably.",
        "More than 200 travellers have liked the breakfast at this property.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/51cd1918fc3c11e880050242ac110003.jpg",
    },
    locationAndSurroundings: {
      title: "Location and Surronudings",
      description: [
        "Dabolim Airport lies at a distance of around 26 km while Madgaon Junction is situated at a distance of about 35.7 km. Panjim KTC Bus Stand is at a walking distance of 7 minutes from the property. The property's location was liked by the travellers due to its proximity to the beach.",
        "Ginger Goa is located at SGO Complex in Panjim and is surrounded by some famous landmarks. One such is the Goa Museum that is 1.4 km away. Another prized attraction nearby is Our Lady of the Immaculate Conception Church (1.7 km).",
      ],
      img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110003.jpg",
    },
    roomDetailsAndAmenities: {
      title: "Room Details and Amenities",
      description: [
        "There are 136 stylish rooms in three categories - D-Luxe (180 sq ft), Luxe (200 sq ft) and Smart Saver (169 sq ft).",
        "D-Luxe Room and Luxe Room have queen beds for 2 guests with complimentary fruit baskets and minibar goodies.",
        "Smart Saver features a single bed with workstation and free Wi-Fi.",
        "Complimentary bath, dental, shaving and hair care kits and complimentary Essential Kit for women are provided in all the categories.",
        "The guests can avail round the clock in-room dining service.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110004.jpg",
    },
    activitiesAndNearbyAttractions: {
      title: "Activities and Near by Attractions",
      description: [
        "Visit Goa Museum if you are a history buff. It is just a 4-minute drive from the property.",
        "The UNESCO World Heritage Site, Basilica of Bom Jesus, is a must-visit for all ages. It is about 9.1 km from the property.",
        "To sunbathe, head to Miramar Beach, which is 4.8 km from the property.",
        "Our Lady of the Immaculate Conception Church is another must-visit for history and architecture lovers, and it is about a 5-minute drive from the property.",
        "Travellers liked to explore the nearby beach.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0ba.jpg",
    },
    hotelDetails: {
      description:
        "Offering the 'Ginger Promise', Ginger Goa is a beautiful property with plenty of recreational options and comfortable facilities enriched by a contemporary ambience.",
      priceDescription: "Perfect for stay!",
      priceLocation:
        "Located in the real heart of Krakow, this property has an excellent location score of 9.8!",
      price: "$94 (per night)",
    },
  },
  {
    imageUrl: "/uploads/hotel2.jpeg",
    name: "The Leela Palace",
    location: "Bangalore",
    distance: "5.0 km from City Center",
    category: "Business",
    rating: 4.8,
    reviewCount: 890,
    price: 25000,
    taxes: 4500,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 5,
    type: "apartment",
    amenities: ["gym", "sauna"],
    facilities: ["wifi", "conference room"],
    featured: false,
    hotelPriceHighlight:
    "Book a stay over $114 at this property and get a free airport taxi",
  inclusions: [
    "Free Welcome Drink on Arrival",
    "Complimentary Early Check in",
    "Refundable",
    "Meal Included",
  ],
  foodAndDining: {
    title: "Food and Dining",
    description: [
      "The Square Meal Restaurant has a casual ambience and serves multicuisine food.",
      "Et Cetera Cafe is an all-day eatery and offers a lively ambience enriched by a good playlist of local and global music genres. It has an outdoor space where you can work comfortably.",
      "More than 200 travellers have liked the breakfast at this property.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/51cd1918fc3c11e880050242ac110003.jpg",
  },
  locationAndSurroundings: {
    title: "Location and Surroundings",
    description: [
      "Dabolim Airport lies at a distance of around 26 km while Madgaon Junction is situated at a distance of about 35.7 km. Panjim KTC Bus Stand is at a walking distance of 7 minutes from the property. The property's location was liked by the travellers due to its proximity to the beach.",
      "Ginger Goa is located at SGO Complex in Panjim and is surrounded by some famous landmarks. One such is the Goa Museum that is 1.4 km away. Another prized attraction nearby is Our Lady of the Immaculate Conception Church (1.7 km).",
    ],
    img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110003.jpg",
  },
  roomDetailsAndAmenities: {
    title: "Room Details and Amenities",
    description: [
      "There are 136 stylish rooms in three categories - D-Luxe (180 sq ft), Luxe (200 sq ft) and Smart Saver (169 sq ft).",
      "D-Luxe Room and Luxe Room have queen beds for 2 guests with complimentary fruit baskets and minibar goodies.",
      "Smart Saver features a single bed with workstation and free Wi-Fi.",
      "Complimentary bath, dental, shaving and hair care kits and complimentary Essential Kit for women are provided in all the categories.",
      "The guests can avail round the clock in-room dining service.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110004.jpg",
  },
  activitiesAndNearbyAttractions: {
    title: "Activities and Nearby Attractions",
    description: [
      "Visit Goa Museum if you are a history buff. It is just a 4-minute drive from the property.",
      "The UNESCO World Heritage Site, Basilica of Bom Jesus, is a must-visit for all ages. It is about 9.1 km from the property.",
      "To sunbathe, head to Miramar Beach, which is 4.8 km from the property.",
      "Our Lady of the Immaculate Conception Church is another must-visit for history and architecture lovers, and it is about a 5-minute drive from the property.",
      "Travellers liked to explore the nearby beach.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0ba.jpg",
  },
  hotelDetails: {
    description:
      "Offering the 'Ginger Promise', Ginger Goa is a beautiful property with plenty of recreational options and comfortable facilities enriched by a contemporary ambience.",
    priceDescription: "Perfect for stay!",
    priceLocation:
      "Located in the real heart of Krakow, this property has an excellent location score of 9.8!",
    price: "$94 (per night)",
  },
  },
  {
    imageUrl: "/uploads/hotel3.jpeg",
    name: "Taj Mahal Palace",
    location: "Mumbai",
    distance: "1.5 km from Gateway of India",
    category: "Luxury",
    rating: 4.9,
    reviewCount: 1500,
    price: 30000,
    taxes: 5400,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 5,
    type: "villa",
    amenities: ["spa", "pool"],
    facilities: ["wifi", "restaurant"],
    featured: false,
    hotelPriceHighlight:
    "Book a luxury suite and get complimentary dinner",
  inclusions: [
    "Free Breakfast",
    "Free Wi-Fi",
    "Complimentary Dinner",
  ],
  foodAndDining: {
    title: "Fine Dining",
    description: [
      "Taj Mahal Palace offers a wide variety of dining options including Indian, European, and Asian cuisines.",
      "Guests can enjoy meals with a view of the Arabian Sea.",
      "The hotel's restaurant is renowned for its exquisite seafood dishes.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/6cd1918fc3c11e880050242ac110006.jpg",
  },
  locationAndSurroundings: {
    title: "Iconic Location",
    description: [
      "Located near the Gateway of India, the hotel offers stunning views of the sea.",
      "Guests can easily explore the nearby Colaba Causeway market.",
      "The hotel is well-connected to major tourist attractions and business districts.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110006.jpg",
  },
  roomDetailsAndAmenities: {
    title: "Elegant Rooms",
    description: [
      "The rooms are elegantly furnished with traditional Indian decor.",
      "Each room features a luxurious bathroom with a soaking tub.",
      "Guests can enjoy a panoramic view of the Arabian Sea from their room.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110006.jpg",
  },
  activitiesAndNearbyAttractions: {
    title: "Cultural Experiences",
    description: [
      "The hotel offers cultural tours and experiences for guests.",
      "Nearby attractions include the Gateway of India and the Prince of Wales Museum.",
      "Guests can enjoy a relaxing day at the hotel's spa and wellness center.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0cc.jpg",
  },
  hotelDetails: {
    description:
      "The Taj Mahal Palace in Mumbai is an iconic hotel offering a blend of traditional Indian hospitality and modern luxury.",
    priceDescription: "Ultimate luxury experience",
    priceLocation:
      "Located in a prime area, the hotel offers an excellent location score of 9.7!",
    price: "$200 (per night)",
  },
  },
  {
    imageUrl: "/uploads/hotel4.jpg",
    name: "Radisson Blu",
    location: "Delhi",
    distance: "10 km from Airport",
    category: "Family",
    rating: 4.3,
    reviewCount: 1345,
    price: 18000,
    taxes: 3240,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 4,
    type: "resort",
    amenities: ["gym", "pool"],
    facilities: ["wifi", "bar"],
    featured: false,
    hotelPriceHighlight:
    "Book a luxury suite and get complimentary dinner",
  inclusions: [
    "Free Breakfast",
    "Free Wi-Fi",
    "Complimentary Dinner",
  ],
  foodAndDining: {
    title: "Fine Dining",
    description: [
      "Taj Mahal Palace offers a wide variety of dining options including Indian, European, and Asian cuisines.",
      "Guests can enjoy meals with a view of the Arabian Sea.",
      "The hotel's restaurant is renowned for its exquisite seafood dishes.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/6cd1918fc3c11e880050242ac110006.jpg",
  },
  locationAndSurroundings: {
    title: "Iconic Location",
    description: [
      "Located near the Gateway of India, the hotel offers stunning views of the sea.",
      "Guests can easily explore the nearby Colaba Causeway market.",
      "The hotel is well-connected to major tourist attractions and business districts.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110006.jpg",
  },
  roomDetailsAndAmenities: {
    title: "Elegant Rooms",
    description: [
      "The rooms are elegantly furnished with traditional Indian decor.",
      "Each room features a luxurious bathroom with a soaking tub.",
      "Guests can enjoy a panoramic view of the Arabian Sea from their room.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110006.jpg",
  },
  activitiesAndNearbyAttractions: {
    title: "Cultural Experiences",
    description: [
      "The hotel offers cultural tours and experiences for guests.",
      "Nearby attractions include the Gateway of India and the Prince of Wales Museum.",
      "Guests can enjoy a relaxing day at the hotel's spa and wellness center.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0cc.jpg",
  },
  hotelDetails: {
    description:
      "The Taj Mahal Palace in Mumbai is an iconic hotel offering a blend of traditional Indian hospitality and modern luxury.",
    priceDescription: "Ultimate luxury experience",
    priceLocation:
      "Located in a prime area, the hotel offers an excellent location score of 9.7!",
    price: "$200 (per night)",
  },
  },
  {
    imageUrl: "/uploads/hotel5.jpg",
    name: "Oberoi Udaivilas",
    location: "Udaipur",
    distance: "3.2 km from City Palace",
    category: "Luxury",
    rating: 4.8,
    reviewCount: 987,
    price: 29000,
    taxes: 5220,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 5,
    type: "camp",
    amenities: ["spa", "garden"],
    facilities: ["wifi", "restaurant"],
    featured: false,
    hotelPriceHighlight:
    "Stay over $110 and enjoy complimentary dinner",
  inclusions: [
    "Free Breakfast",
    "Free Wi-Fi",
    "Complimentary Dinner",
  ],
  foodAndDining: {
    title: "Family Dining",
    description: [
      "Hyatt Regency offers a variety of dining options suitable for families.",
      "Guests can enjoy Indian, Continental, and Asian cuisines.",
      "The breakfast buffet is highly recommended for its variety and quality.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/8cd1918fc3c11e880050242ac110008.jpg",
  },
  locationAndSurroundings: {
    title: "Convenient Location",
    description: [
      "The hotel is located near the city center, making it ideal for exploring Kolkata.",
      "Nearby attractions include the Victoria Memorial and the Howrah Bridge.",
      "The hotel is well-connected to major tourist spots and shopping areas.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110008.jpg",
  },
  roomDetailsAndAmenities: {
    title: "Comfortable Rooms",
    description: [
      "The rooms are spacious and designed with families in mind.",
      "Each room includes a flat-screen TV, minibar, and en-suite bathroom.",
      "Guests can enjoy a beautiful view of the city from their room.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110008.jpg",
  },
  activitiesAndNearbyAttractions: {
    title: "Family Activities",
    description: [
      "The hotel offers a fitness center, swimming pool, and spa.",
      "Guests can enjoy family-friendly activities and entertainment.",
      "Nearby attractions include the Victoria Memorial and the Howrah Bridge.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0ee.jpg",
  },
  hotelDetails: {
    description:
      "Hyatt Regency in Kolkata is a family-friendly hotel offering comfortable accommodations and a range of amenities.",
    priceDescription: "Ideal family stay",
    priceLocation:
      "Located near the city center, the hotel boasts an excellent location with a rating of 9.3!",
    price: "$110 (per night)",
  },
  },
  {
    imageUrl: "/uploads/hotel6.jpg",
    name: "Hyatt Regency",
    location: "Kolkata",
    distance: "7 km from Howrah Bridge",
    category: "Business",
    rating: 4.5,
    reviewCount: 1200,
    price: 21000,
    taxes: 3780,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 4,
    type: "hotel",
    amenities: ["gym", "spa"],
    facilities: ["wifi", "conference room"],
    featured: false,
    hotelPriceHighlight:
      "Book a stay over $114 at this property and get a free airport taxi",
    inclusions: [
      "Free Welcome Drink on Arrival",
      "Complimentary Early Check in",
      "Refundable",
      "Meal Included",
    ],
    foodAndDining: {
      title: "Food and Dining",
      description: [
        "The Square Meal Restaurant has a casual ambience and serves multicuisine food.",
        "Et Cetera Cafe is an all-day eatery and offers a lively ambience enriched by a good playlist of local and global music genres. It has an outdoor space where you can work comfortably.",
        "More than 200 travellers have liked the breakfast at this property.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/51cd1918fc3c11e880050242ac110003.jpg",
    },
    locationAndSurroundings: {
      title: "Location and Surroundings",
      description: [
        "Dabolim Airport lies at a distance of around 26 km while Madgaon Junction is situated at a distance of about 35.7 km. Panjim KTC Bus Stand is at a walking distance of 7 minutes from the property. The property's location was liked by the travellers due to its proximity to the beach.",
        "Ginger Goa is located at SGO Complex in Panjim and is surrounded by some famous landmarks. One such is the Goa Museum that is 1.4 km away. Another prized attraction nearby is Our Lady of the Immaculate Conception Church (1.7 km).",
      ],
      img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110003.jpg",
    },
    roomDetailsAndAmenities: {
      title: "Room Details and Amenities",
      description: [
        "There are 136 stylish rooms in three categories - D-Luxe (180 sq ft), Luxe (200 sq ft) and Smart Saver (169 sq ft).",
        "D-Luxe Room and Luxe Room have queen beds for 2 guests with complimentary fruit baskets and minibar goodies.",
        "Smart Saver features a single bed with workstation and free Wi-Fi.",
        "Complimentary bath, dental, shaving and hair care kits and complimentary Essential Kit for women are provided in all the categories.",
        "The guests can avail round the clock in-room dining service.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110004.jpg",
    },
    activitiesAndNearbyAttractions: {
      title: "Activities and Nearby Attractions",
      description: [
        "Visit Goa Museum if you are a history buff. It is just a 4-minute drive from the property.",
        "The UNESCO World Heritage Site, Basilica of Bom Jesus, is a must-visit for all ages. It is about 9.1 km from the property.",
        "To sunbathe, head to Miramar Beach, which is 4.8 km from the property.",
        "Our Lady of the Immaculate Conception Church is another must-visit for history and architecture lovers, and it is about a 5-minute drive from the property.",
        "Travellers liked to explore the nearby beach.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0ba.jpg",
    },
    hotelDetails: {
      description:
        "Offering the 'Ginger Promise', Ginger Goa is a beautiful property with plenty of recreational options and comfortable facilities enriched by a contemporary ambience.",
      priceDescription: "Perfect for stay!",
      priceLocation:
        "Located in the real heart of Krakow, this property has an excellent location score of 9.8!",
      price: "$94 (per night)",
    },
  },
  {
    imageUrl: "/uploads/hotel1.jpg",
    name: "ITC Grand Chola",
    location: "Chennai",
    distance: "6.5 km from Marina Beach",
    category: "Luxury",
    rating: 4.7,
    reviewCount: 1150,
    price: 26000,
    taxes: 4680,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 5,
    type: "villa",
    amenities: ["spa", "pool"],
    facilities: ["wifi", "bar"],
    featured: true,
    hotelPriceHighlight:
      "Book a stay over $114 at this property and get a free airport taxi",
    inclusions: [
      "Free Welcome Drink on Arrival",
      "Complimentary Early Check in",
      "Refundable",
      "Meal Included",
    ],
    foodAndDining: {
      title: "Food and Dining",
      description: [
        "The Square Meal Restaurant has a casual ambience and serves multicuisine food.",
        "Et Cetera Cafe is an all-day eatery and offers a lively ambience enriched by a good playlist of local and global music genres. It has an outdoor space where you can work comfortably.",
        "More than 200 travellers have liked the breakfast at this property.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/51cd1918fc3c11e880050242ac110003.jpg",
    },
    locationAndSurroundings: {
      title: "Location and Surroundings",
      description: [
        "Dabolim Airport lies at a distance of around 26 km while Madgaon Junction is situated at a distance of about 35.7 km. Panjim KTC Bus Stand is at a walking distance of 7 minutes from the property. The property's location was liked by the travellers due to its proximity to the beach.",
        "Ginger Goa is located at SGO Complex in Panjim and is surrounded by some famous landmarks. One such is the Goa Museum that is 1.4 km away. Another prized attraction nearby is Our Lady of the Immaculate Conception Church (1.7 km).",
      ],
      img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110003.jpg",
    },
    roomDetailsAndAmenities: {
      title: "Room Details and Amenities",
      description: [
        "There are 136 stylish rooms in three categories - D-Luxe (180 sq ft), Luxe (200 sq ft) and Smart Saver (169 sq ft).",
        "D-Luxe Room and Luxe Room have queen beds for 2 guests with complimentary fruit baskets and minibar goodies.",
        "Smart Saver features a single bed with workstation and free Wi-Fi.",
        "Complimentary bath, dental, shaving and hair care kits and complimentary Essential Kit for women are provided in all the categories.",
        "The guests can avail round the clock in-room dining service.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110004.jpg",
    },
    activitiesAndNearbyAttractions: {
      title: "Activities and Nearby Attractions",
      description: [
        "Visit Goa Museum if you are a history buff. It is just a 4-minute drive from the property.",
        "The UNESCO World Heritage Site, Basilica of Bom Jesus, is a must-visit for all ages. It is about 9.1 km from the property.",
        "To sunbathe, head to Miramar Beach, which is 4.8 km from the property.",
        "Our Lady of the Immaculate Conception Church is another must-visit for history and architecture lovers, and it is about a 5-minute drive from the property.",
        "Travellers liked to explore the nearby beach.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0ba.jpg",
    },
    hotelDetails: {
      description:
        "Offering the 'Ginger Promise', Ginger Goa is a beautiful property with plenty of recreational options and comfortable facilities enriched by a contemporary ambience.",
      priceDescription: "Perfect for stay!",
      priceLocation:
        "Located in the real heart of Krakow, this property has an excellent location score of 9.8!",
      price: "$94 (per night)",
    },
  },
  {
    imageUrl: "/uploads/hotel2.jpeg",
    name: "Trident",
    location: "Jaipur",
    distance: "4.5 km from Hawa Mahal",
    category: "Family",
    rating: 4.4,
    reviewCount: 1020,
    price: 17000,
    taxes: 3060,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 4,
    type: "apartment",
    amenities: ["gym", "spa"],
    facilities: ["wifi", "restaurant"],
    featured: false,
    hotelPriceHighlight:
    "Book a stay over $114 at this property and get a free airport taxi",
  inclusions: [
    "Free Welcome Drink on Arrival",
    "Complimentary Early Check in",
    "Refundable",
    "Meal Included",
  ],
  foodAndDining: {
    title: "Food and Dining",
    description: [
      "The Square Meal Restaurant has a casual ambience and serves multicuisine food.",
      "Et Cetera Cafe is an all-day eatery and offers a lively ambience enriched by a good playlist of local and global music genres. It has an outdoor space where you can work comfortably.",
      "More than 200 travellers have liked the breakfast at this property.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/51cd1918fc3c11e880050242ac110003.jpg",
  },
  locationAndSurroundings: {
    title: "Location and Surroundings",
    description: [
      "Dabolim Airport lies at a distance of around 26 km while Madgaon Junction is situated at a distance of about 35.7 km. Panjim KTC Bus Stand is at a walking distance of 7 minutes from the property. The property's location was liked by the travellers due to its proximity to the beach.",
      "Ginger Goa is located at SGO Complex in Panjim and is surrounded by some famous landmarks. One such is the Goa Museum that is 1.4 km away. Another prized attraction nearby is Our Lady of the Immaculate Conception Church (1.7 km).",
    ],
    img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110003.jpg",
  },
  roomDetailsAndAmenities: {
    title: "Room Details and Amenities",
    description: [
      "There are 136 stylish rooms in three categories - D-Luxe (180 sq ft), Luxe (200 sq ft) and Smart Saver (169 sq ft).",
      "D-Luxe Room and Luxe Room have queen beds for 2 guests with complimentary fruit baskets and minibar goodies.",
      "Smart Saver features a single bed with workstation and free Wi-Fi.",
      "Complimentary bath, dental, shaving and hair care kits and complimentary Essential Kit for women are provided in all the categories.",
      "The guests can avail round the clock in-room dining service.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110004.jpg",
  },
  activitiesAndNearbyAttractions: {
    title: "Activities and Nearby Attractions",
    description: [
      "Visit Goa Museum if you are a history buff. It is just a 4-minute drive from the property.",
      "The UNESCO World Heritage Site, Basilica of Bom Jesus, is a must-visit for all ages. It is about 9.1 km from the property.",
      "To sunbathe, head to Miramar Beach, which is 4.8 km from the property.",
      "Our Lady of the Immaculate Conception Church is another must-visit for history and architecture lovers, and it is about a 5-minute drive from the property.",
      "Travellers liked to explore the nearby beach.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0ba.jpg",
  },
  hotelDetails: {
    description:
      "Offering the 'Ginger Promise', Ginger Goa is a beautiful property with plenty of recreational options and comfortable facilities enriched by a contemporary ambience.",
    priceDescription: "Perfect for stay!",
    priceLocation:
      "Located in the real heart of Krakow, this property has an excellent location score of 9.8!",
    price: "$94 (per night)",
  },
  },
  {
    imageUrl: "/uploads/hotel3.jpeg",
    name: "Vivanta by Taj",
    location: "Goa",
    distance: "8.3 km from Baga Beach",
    category: "Couple Friendly",
    rating: 4.6,
    reviewCount: 1250,
    price: 23000,
    taxes: 4140,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 5,
    type: "resort",
    amenities: ["spa", "garden"],
    facilities: ["wifi", "bar"],
    featured: false,
    hotelPriceHighlight:
    "Book a luxury suite and get complimentary dinner",
  inclusions: [
    "Free Breakfast",
    "Free Wi-Fi",
    "Complimentary Dinner",
  ],
  foodAndDining: {
    title: "Fine Dining",
    description: [
      "Taj Mahal Palace offers a wide variety of dining options including Indian, European, and Asian cuisines.",
      "Guests can enjoy meals with a view of the Arabian Sea.",
      "The hotel's restaurant is renowned for its exquisite seafood dishes.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/6cd1918fc3c11e880050242ac110006.jpg",
  },
  locationAndSurroundings: {
    title: "Iconic Location",
    description: [
      "Located near the Gateway of India, the hotel offers stunning views of the sea.",
      "Guests can easily explore the nearby Colaba Causeway market.",
      "The hotel is well-connected to major tourist attractions and business districts.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110006.jpg",
  },
  roomDetailsAndAmenities: {
    title: "Elegant Rooms",
    description: [
      "The rooms are elegantly furnished with traditional Indian decor.",
      "Each room features a luxurious bathroom with a soaking tub.",
      "Guests can enjoy a panoramic view of the Arabian Sea from their room.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110006.jpg",
  },
  activitiesAndNearbyAttractions: {
    title: "Cultural Experiences",
    description: [
      "The hotel offers cultural tours and experiences for guests.",
      "Nearby attractions include the Gateway of India and the Prince of Wales Museum.",
      "Guests can enjoy a relaxing day at the hotel's spa and wellness center.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0cc.jpg",
  },
  hotelDetails: {
    description:
      "The Taj Mahal Palace in Mumbai is an iconic hotel offering a blend of traditional Indian hospitality and modern luxury.",
    priceDescription: "Ultimate luxury experience",
    priceLocation:
      "Located in a prime area, the hotel offers an excellent location score of 9.7!",
    price: "$200 (per night)",
  },
  },
  {
    imageUrl: "/uploads/hotel4.jpg",
    name: "Lemon Tree",
    location: "Ahmedabad",
    distance: "2.0 km from Sabarmati Ashram",
    category: "Business",
    rating: 4.2,
    reviewCount: 1100,
    price: 15000,
    taxes: 2700,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 3,
    type: "camp",
    amenities: ["gym", "Swimming pool"],
    facilities: ["pool", "conference room"],
    featured: true,
    hotelPriceHighlight:
    "Book a luxury suite and get complimentary dinner",
  inclusions: [
    "Free Breakfast",
    "Free Wi-Fi",
    "Complimentary Dinner",
  ],
  foodAndDining: {
    title: "Fine Dining",
    description: [
      "Taj Mahal Palace offers a wide variety of dining options including Indian, European, and Asian cuisines.",
      "Guests can enjoy meals with a view of the Arabian Sea.",
      "The hotel's restaurant is renowned for its exquisite seafood dishes.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/6cd1918fc3c11e880050242ac110006.jpg",
  },
  locationAndSurroundings: {
    title: "Iconic Location",
    description: [
      "Located near the Gateway of India, the hotel offers stunning views of the sea.",
      "Guests can easily explore the nearby Colaba Causeway market.",
      "The hotel is well-connected to major tourist attractions and business districts.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110006.jpg",
  },
  roomDetailsAndAmenities: {
    title: "Elegant Rooms",
    description: [
      "The rooms are elegantly furnished with traditional Indian decor.",
      "Each room features a luxurious bathroom with a soaking tub.",
      "Guests can enjoy a panoramic view of the Arabian Sea from their room.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110006.jpg",
  },
  activitiesAndNearbyAttractions: {
    title: "Cultural Experiences",
    description: [
      "The hotel offers cultural tours and experiences for guests.",
      "Nearby attractions include the Gateway of India and the Prince of Wales Museum.",
      "Guests can enjoy a relaxing day at the hotel's spa and wellness center.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0cc.jpg",
  },
  hotelDetails: {
    description:
      "The Taj Mahal Palace in Mumbai is an iconic hotel offering a blend of traditional Indian hospitality and modern luxury.",
    priceDescription: "Ultimate luxury experience",
    priceLocation:
      "Located in a prime area, the hotel offers an excellent location score of 9.7!",
    price: "$200 (per night)",
  },
  },
  {
    imageUrl: "/uploads/hotel5.jpg",
    name: "Le Meridien",
    location: "Kochi",
    distance: "5.5 km from Marine Drive",
    category: "Luxury",
    rating: 4.7,
    reviewCount: 980,
    price: 24000,
    taxes: 4320,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 5,
    type: "hotel",
    amenities: ["spa", "wifi"],
    facilities: ["spa", "restaurant"],
    featured: false,
    hotelPriceHighlight:
    "Stay over $110 and enjoy complimentary dinner",
  inclusions: [
    "Free Breakfast",
    "Free Wi-Fi",
    "Complimentary Dinner",
  ],
  foodAndDining: {
    title: "Family Dining",
    description: [
      "Hyatt Regency offers a variety of dining options suitable for families.",
      "Guests can enjoy Indian, Continental, and Asian cuisines.",
      "The breakfast buffet is highly recommended for its variety and quality.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/8cd1918fc3c11e880050242ac110008.jpg",
  },
  locationAndSurroundings: {
    title: "Convenient Location",
    description: [
      "The hotel is located near the city center, making it ideal for exploring Kolkata.",
      "Nearby attractions include the Victoria Memorial and the Howrah Bridge.",
      "The hotel is well-connected to major tourist spots and shopping areas.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110008.jpg",
  },
  roomDetailsAndAmenities: {
    title: "Comfortable Rooms",
    description: [
      "The rooms are spacious and designed with families in mind.",
      "Each room includes a flat-screen TV, minibar, and en-suite bathroom.",
      "Guests can enjoy a beautiful view of the city from their room.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110008.jpg",
  },
  activitiesAndNearbyAttractions: {
    title: "Family Activities",
    description: [
      "The hotel offers a fitness center, swimming pool, and spa.",
      "Guests can enjoy family-friendly activities and entertainment.",
      "Nearby attractions include the Victoria Memorial and the Howrah Bridge.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0ee.jpg",
  },
  hotelDetails: {
    description:
      "Hyatt Regency in Kolkata is a family-friendly hotel offering comfortable accommodations and a range of amenities.",
    priceDescription: "Ideal family stay",
    priceLocation:
      "Located near the city center, the hotel boasts an excellent location with a rating of 9.3!",
    price: "$110 (per night)",
  },
  },
  {
    imageUrl: "/uploads/hotel6.jpg",
    name: "Fairmont Jaipur",
    location: "Jaipur",
    distance: "12.0 km from Amber Fort",
    category: "Luxury",
    rating: 4.8,
    reviewCount: 1040,
    price: 28000,
    taxes: 5040,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 5,
    type: "hotel",
    amenities: ["spa", "garden"],
    facilities: ["gym", "restaurant"],
    featured: false,
    hotelPriceHighlight:
      "Book a stay over $114 at this property and get a free airport taxi",
    inclusions: [
      "Free Welcome Drink on Arrival",
      "Complimentary Early Check in",
      "Refundable",
      "Meal Included",
    ],
    foodAndDining: {
      title: "Food and Dining",
      description: [
        "The Square Meal Restaurant has a casual ambience and serves multicuisine food.",
        "Et Cetera Cafe is an all-day eatery and offers a lively ambience enriched by a good playlist of local and global music genres. It has an outdoor space where you can work comfortably.",
        "More than 200 travellers have liked the breakfast at this property.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/51cd1918fc3c11e880050242ac110003.jpg",
    },
    locationAndSurroundings: {
      title: "Location and Surroundings",
      description: [
        "Dabolim Airport lies at a distance of around 26 km while Madgaon Junction is situated at a distance of about 35.7 km. Panjim KTC Bus Stand is at a walking distance of 7 minutes from the property. The property's location was liked by the travellers due to its proximity to the beach.",
        "Ginger Goa is located at SGO Complex in Panjim and is surrounded by some famous landmarks. One such is the Goa Museum that is 1.4 km away. Another prized attraction nearby is Our Lady of the Immaculate Conception Church (1.7 km).",
      ],
      img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110003.jpg",
    },
    roomDetailsAndAmenities: {
      title: "Room Details and Amenities",
      description: [
        "There are 136 stylish rooms in three categories - D-Luxe (180 sq ft), Luxe (200 sq ft) and Smart Saver (169 sq ft).",
        "D-Luxe Room and Luxe Room have queen beds for 2 guests with complimentary fruit baskets and minibar goodies.",
        "Smart Saver features a single bed with workstation and free Wi-Fi.",
        "Complimentary bath, dental, shaving and hair care kits and complimentary Essential Kit for women are provided in all the categories.",
        "The guests can avail round the clock in-room dining service.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110004.jpg",
    },
    activitiesAndNearbyAttractions: {
      title: "Activities and Nearby Attractions",
      description: [
        "Visit Goa Museum if you are a history buff. It is just a 4-minute drive from the property.",
        "The UNESCO World Heritage Site, Basilica of Bom Jesus, is a must-visit for all ages. It is about 9.1 km from the property.",
        "To sunbathe, head to Miramar Beach, which is 4.8 km from the property.",
        "Our Lady of the Immaculate Conception Church is another must-visit for history and architecture lovers, and it is about a 5-minute drive from the property.",
        "Travellers liked to explore the nearby beach.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0ba.jpg",
    },
    hotelDetails: {
      description:
        "Offering the 'Ginger Promise', Ginger Goa is a beautiful property with plenty of recreational options and comfortable facilities enriched by a contemporary ambience.",
      priceDescription: "Perfect for stay!",
      priceLocation:
        "Located in the real heart of Krakow, this property has an excellent location score of 9.8!",
      price: "$94 (per night)",
    },
  },
  {
    imageUrl: "/uploads/hotel1.jpg",
    name: "Novotel",
    location: "Pune",
    distance: "3.5 km from Pune Airport",
    category: "Business",
    rating: 4.5,
    reviewCount: 950,
    price: 20000,
    taxes: 3600,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 4,
    type: "villa",
    amenities: ["gym", "spa"],
    facilities: ["pool", "spa"],
    featured: true,
    hotelPriceHighlight:
      "Book a stay over $114 at this property and get a free airport taxi",
    inclusions: [
      "Free Welcome Drink on Arrival",
      "Complimentary Early Check in",
      "Refundable",
      "Meal Included",
    ],
    foodAndDining: {
      title: "Food and Dining",
      description: [
        "The Square Meal Restaurant has a casual ambience and serves multicuisine food.",
        "Et Cetera Cafe is an all-day eatery and offers a lively ambience enriched by a good playlist of local and global music genres. It has an outdoor space where you can work comfortably.",
        "More than 200 travellers have liked the breakfast at this property.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/51cd1918fc3c11e880050242ac110003.jpg",
    },
    locationAndSurroundings: {
      title: "Location and Surroundings",
      description: [
        "Dabolim Airport lies at a distance of around 26 km while Madgaon Junction is situated at a distance of about 35.7 km. Panjim KTC Bus Stand is at a walking distance of 7 minutes from the property. The property's location was liked by the travellers due to its proximity to the beach.",
        "Ginger Goa is located at SGO Complex in Panjim and is surrounded by some famous landmarks. One such is the Goa Museum that is 1.4 km away. Another prized attraction nearby is Our Lady of the Immaculate Conception Church (1.7 km).",
      ],
      img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110003.jpg",
    },
    roomDetailsAndAmenities: {
      title: "Room Details and Amenities",
      description: [
        "There are 136 stylish rooms in three categories - D-Luxe (180 sq ft), Luxe (200 sq ft) and Smart Saver (169 sq ft).",
        "D-Luxe Room and Luxe Room have queen beds for 2 guests with complimentary fruit baskets and minibar goodies.",
        "Smart Saver features a single bed with workstation and free Wi-Fi.",
        "Complimentary bath, dental, shaving and hair care kits and complimentary Essential Kit for women are provided in all the categories.",
        "The guests can avail round the clock in-room dining service.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110004.jpg",
    },
    activitiesAndNearbyAttractions: {
      title: "Activities and Nearby Attractions",
      description: [
        "Visit Goa Museum if you are a history buff. It is just a 4-minute drive from the property.",
        "The UNESCO World Heritage Site, Basilica of Bom Jesus, is a must-visit for all ages. It is about 9.1 km from the property.",
        "To sunbathe, head to Miramar Beach, which is 4.8 km from the property.",
        "Our Lady of the Immaculate Conception Church is another must-visit for history and architecture lovers, and it is about a 5-minute drive from the property.",
        "Travellers liked to explore the nearby beach.",
      ],
      img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0ba.jpg",
    },
    hotelDetails: {
      description:
        "Offering the 'Ginger Promise', Ginger Goa is a beautiful property with plenty of recreational options and comfortable facilities enriched by a contemporary ambience.",
      priceDescription: "Perfect for stay!",
      priceLocation:
        "Located in the real heart of Krakow, this property has an excellent location score of 9.8!",
      price: "$94 (per night)",
    },
  },
  {
    imageUrl: "/uploads/hotel2.jpeg",
    name: "JW Marriott",
    location: "Mumbai",
    distance: "3.0 km from Juhu Beach",
    category: "Luxury",
    rating: 4.9,
    reviewCount: 1230,
    price: 31000,
    taxes: 5580,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 5,
    type: "hotel",
    amenities: ["spa", "pool"],
    facilities: ["pool", "gym"],
    featured: false,
    hotelPriceHighlight:
    "Book a stay over $114 at this property and get a free airport taxi",
  inclusions: [
    "Free Welcome Drink on Arrival",
    "Complimentary Early Check in",
    "Refundable",
    "Meal Included",
  ],
  foodAndDining: {
    title: "Food and Dining",
    description: [
      "The Square Meal Restaurant has a casual ambience and serves multicuisine food.",
      "Et Cetera Cafe is an all-day eatery and offers a lively ambience enriched by a good playlist of local and global music genres. It has an outdoor space where you can work comfortably.",
      "More than 200 travellers have liked the breakfast at this property.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/51cd1918fc3c11e880050242ac110003.jpg",
  },
  locationAndSurroundings: {
    title: "Location and Surroundings",
    description: [
      "Dabolim Airport lies at a distance of around 26 km while Madgaon Junction is situated at a distance of about 35.7 km. Panjim KTC Bus Stand is at a walking distance of 7 minutes from the property. The property's location was liked by the travellers due to its proximity to the beach.",
      "Ginger Goa is located at SGO Complex in Panjim and is surrounded by some famous landmarks. One such is the Goa Museum that is 1.4 km away. Another prized attraction nearby is Our Lady of the Immaculate Conception Church (1.7 km).",
    ],
    img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110003.jpg",
  },
  roomDetailsAndAmenities: {
    title: "Room Details and Amenities",
    description: [
      "There are 136 stylish rooms in three categories - D-Luxe (180 sq ft), Luxe (200 sq ft) and Smart Saver (169 sq ft).",
      "D-Luxe Room and Luxe Room have queen beds for 2 guests with complimentary fruit baskets and minibar goodies.",
      "Smart Saver features a single bed with workstation and free Wi-Fi.",
      "Complimentary bath, dental, shaving and hair care kits and complimentary Essential Kit for women are provided in all the categories.",
      "The guests can avail round the clock in-room dining service.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110004.jpg",
  },
  activitiesAndNearbyAttractions: {
    title: "Activities and Nearby Attractions",
    description: [
      "Visit Goa Museum if you are a history buff. It is just a 4-minute drive from the property.",
      "The UNESCO World Heritage Site, Basilica of Bom Jesus, is a must-visit for all ages. It is about 9.1 km from the property.",
      "To sunbathe, head to Miramar Beach, which is 4.8 km from the property.",
      "Our Lady of the Immaculate Conception Church is another must-visit for history and architecture lovers, and it is about a 5-minute drive from the property.",
      "Travellers liked to explore the nearby beach.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0ba.jpg",
  },
  hotelDetails: {
    description:
      "Offering the 'Ginger Promise', Ginger Goa is a beautiful property with plenty of recreational options and comfortable facilities enriched by a contemporary ambience.",
    priceDescription: "Perfect for stay!",
    priceLocation:
      "Located in the real heart of Krakow, this property has an excellent location score of 9.8!",
    price: "$94 (per night)",
  },
  },
  {
    imageUrl: "/uploads/hotel3.jpeg",
    name: "The Lalit",
    location: "Kolkata",
    distance: "4.5 km from Victoria Memorial",
    category: "Luxury",
    rating: 4.6,
    reviewCount: 1100,
    price: 22000,
    taxes: 3960,
    images: ["/uploads/hotel1.jpg", "/uploads/hotel2.jpeg","/uploads/hotel3.jpeg","/uploads/hotel4.jpg","/uploads/hotel5.jpg","/uploads/hotel6.jpg"],
    star: 5,
    type: "apartment",
    amenities: ["spa", "wifi"],
    facilities: ["spa", "gym"],
    featured: true,
    hotelPriceHighlight:
    "Book a luxury suite and get complimentary dinner",
  inclusions: [
    "Free Breakfast",
    "Free Wi-Fi",
    "Complimentary Dinner",
  ],
  foodAndDining: {
    title: "Fine Dining",
    description: [
      "Taj Mahal Palace offers a wide variety of dining options including Indian, European, and Asian cuisines.",
      "Guests can enjoy meals with a view of the Arabian Sea.",
      "The hotel's restaurant is renowned for its exquisite seafood dishes.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/6cd1918fc3c11e880050242ac110006.jpg",
  },
  locationAndSurroundings: {
    title: "Iconic Location",
    description: [
      "Located near the Gateway of India, the hotel offers stunning views of the sea.",
      "Guests can easily explore the nearby Colaba Causeway market.",
      "The hotel is well-connected to major tourist attractions and business districts.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/bd735e8cff9011e8a6110242ac110006.jpg",
  },
  roomDetailsAndAmenities: {
    title: "Elegant Rooms",
    description: [
      "The rooms are elegantly furnished with traditional Indian decor.",
      "Each room features a luxurious bathroom with a soaking tub.",
      "Guests can enjoy a panoramic view of the Arabian Sea from their room.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/5b60a9ceff9111e884200242ac110006.jpg",
  },
  activitiesAndNearbyAttractions: {
    title: "Cultural Experiences",
    description: [
      "The hotel offers cultural tours and experiences for guests.",
      "Nearby attractions include the Gateway of India and the Prince of Wales Museum.",
      "Guests can enjoy a relaxing day at the hotel's spa and wellness center.",
    ],
    img: "https://r1imghtlak.mmtcdn.com/507c90e0af3711e8836702ea65e6f0cc.jpg",
  },
  hotelDetails: {
    description:
      "The Taj Mahal Palace in Mumbai is an iconic hotel offering a blend of traditional Indian hospitality and modern luxury.",
    priceDescription: "Ultimate luxury experience",
    priceLocation:
      "Located in a prime area, the hotel offers an excellent location score of 9.7!",
    price: "$200 (per night)",
  },
  },
];

export default hotels;