export const restaurants = [
  { 
    restId: 1, 
    name: 'Pizza Yum', 
    hours: '9am - 12am', 
    tags: ['italian', 'cheesy'], 
    logo: null, 
    rating: 5,
    location: '123 Main St, Toronto, Canada'
  },
  { 
    restId: 2, 
    name: 'McMmm', 
    hours: '2am - 7pm', 
    tags: ['burgers', 'fastfood', 'dairy-free'], 
    logo: null, 
    rating: 4,
    location: '456 King St, Vancouver, Canada'
  },
  { 
    restId: 3, 
    name: 'Sushi Go!', 
    hours: '11am - 10pm', 
    tags: ['japanese', 'seafood', 'fresh', 'vegan', 'organic', 'healthy'], 
    logo: null, 
    rating: 4.5,
    location: '789 Queen St, Montreal, Canada'
  },
  { 
    restId: 4, 
    name: 'Taco Town', 
    hours: '10am - 11pm', 
    tags: ['mexican', 'spicy', 'street-food'], 
    logo: null, 
    rating: 4.2,
    location: '321 Elm St, Calgary, Canada'
  },
  { 
    restId: 5, 
    name: 'Green Fork', 
    hours: '8am - 8pm', 
    tags: ['vegan', 'organic', 'healthy'], 
    logo: null, 
    rating: 4.8,
    location: '654 Maple Ave, Ottawa, Canada'
  },
  { 
    restId: 6, 
    name: 'Curry Corner', 
    hours: '12pm - 10pm', 
    tags: ['indian', 'spicy', 'vegetarian'], 
    logo: null, 
    rating: 4.3,
    location: '987 Bloor St, Edmonton, Canada'
  },
  { 
    restId: 7, 
    name: 'The Grill Spot', 
    hours: '11am - 12am', 
    tags: ['barbecue', 'steakhouse', 'meat-lovers'], 
    logo: null, 
    rating: 4.6,
    location: '111 Front St, Winnipeg, Canada'
  },
  { 
    restId: 8, 
    name: 'Noodle Nest', 
    hours: '10am - 9pm', 
    tags: ['chinese', 'noodles', 'comfort-food'], 
    logo: null, 
    rating: 4.1,
    location: '222 Bay St, Halifax, Canada'
  },
  { 
    restId: 9, 
    name: 'Morning Mug', 
    hours: '6am - 4pm', 
    tags: ['coffee', 'breakfast', 'pastries'], 
    logo: null, 
    rating: 4.9,
    location: '333 Yonge St, Victoria, Canada'
  },
  { 
    restId: 10, 
    name: 'Falafel Factory', 
    hours: '9am - 10pm', 
    tags: ['mediterranean', 'vegan', 'wraps'], 
    logo: null, 
    rating: 4.4,
    location: '444 Granville St, Quebec City, Canada'
  }
];



export function restById (id){
    return restaurants[id-1];
}