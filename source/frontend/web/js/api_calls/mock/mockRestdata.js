export const restaurants = [
  { 
    restID: 1, 
    name: 'Pizza Yum', 
    hours: '9am - 12am', 
    tags: ['italian', 'cheesy'], 
    logo: null, 
    rating: 5,
    address: '123 Main St, Toronto, Canada',
    menu: [
      { itemID: 1, name: "Margherita Pizza", category: "Pizza", price: 14.99, description: "Classic pizza with fresh basil, mozzarella, and tomato sauce." },
      { itemID: 2, name: "Pepperoni Deluxe", category: "Pizza", price: 16.50, description: "Loaded with mozzarella and double pepperoni." },
      { itemID: 3, name: "Cheesy Garlic Bread", category: "Sides", price: 6.99, description: "Freshly baked garlic bread topped with melted cheese." },
      { itemID: 4, name: "Tiramisu", category: "Desserts", price: 7.99, description: "Classic Italian dessert made with mascarpone and espresso." }
    ]
  },
  { 
    restID: 2, 
    name: 'McMmm', 
    hours: '2am - 7pm', 
    tags: ['burgers', 'fastfood', 'dairy-free'], 
    logo: null, 
    rating: 4,
    address: '456 King St, Vancouver, Canada',
    menu: [
      { itemID: 1, name: "Classic Cheeseburger", category: "Burgers", price: 9.99, description: "Juicy beef patty with cheddar cheese, lettuce, and tomato." },
      { itemID: 2, name: "Crispy Chicken Sandwich", category: "Sandwiches", price: 10.49, description: "Crispy chicken fillet with mayo and pickles on a toasted bun." },
      { itemID: 3, name: "French Fries", category: "Sides", price: 3.99, description: "Golden, crispy fries served with ketchup or mayo." },
      { itemID: 4, name: "Chocolate Milkshake", category: "Drinks", price: 4.50, description: "Rich and creamy chocolate shake topped with whipped cream." }
    ]
  },
  { 
    restID: 3, 
    name: 'Sushi Go!', 
    hours: '11am - 10pm', 
    tags: ['japanese', 'seafood', 'fresh', 'vegan', 'organic', 'healthy'], 
    logo: null, 
    rating: 4.5,
    address: '789 Queen St, Montreal, Canada',
    menu: [
      { itemID: 1, name: "Salmon Nigiri", category: "Sushi", price: 12.99, description: "Fresh Atlantic salmon over sushi rice." },
      { itemID: 2, name: "California Roll", category: "Rolls", price: 10.49, description: "Crab, avocado, and cucumber rolled with sesame seeds." },
      { itemID: 3, name: "Miso Soup", category: "Soups", price: 4.25, description: "Classic miso broth with tofu and seaweed." },
      { itemID: 4, name: "Matcha Ice Cream", category: "Desserts", price: 5.99, description: "Creamy green tea ice cream with earthy sweetness." }
    ]
  },
  { 
    restID: 4, 
    name: 'Taco Town', 
    hours: '10am - 11pm', 
    tags: ['mexican', 'spicy', 'street-food'], 
    logo: null, 
    rating: 4.2,
    address: '321 Elm St, Calgary, Canada',
    menu: [
      { itemID: 1, name: "Beef Tacos", category: "Tacos", price: 8.99, description: "Soft tortillas filled with seasoned ground beef and salsa." },
      { itemID: 2, name: "Chicken Quesadilla", category: "Mains", price: 10.49, description: "Grilled tortilla stuffed with cheese and spiced chicken." },
      { itemID: 3, name: "Nachos Supreme", category: "Appetizers", price: 9.50, description: "Topped with cheese, beans, jalapeños, and sour cream." },
      { itemID: 4, name: "Churros", category: "Desserts", price: 6.00, description: "Cinnamon-sugar dusted churros with chocolate dip." }
    ]
  },
  { 
    restID: 5, 
    name: 'Green Fork', 
    hours: '8am - 8pm', 
    tags: ['vegan', 'organic', 'healthy'], 
    logo: null, 
    rating: 4.8,
    address: '654 Maple Ave, Ottawa, Canada',
    menu: [
      { itemID: 1, name: "Quinoa Salad", category: "Salads", price: 9.75, description: "Quinoa with roasted veggies and citrus vinaigrette." },
      { itemID: 2, name: "Avocado Toast", category: "Breakfast", price: 7.99, description: "Sourdough toast with mashed avocado and microgreens." },
      { itemID: 3, name: "Vegan Smoothie Bowl", category: "Breakfast", price: 8.99, description: "Blended fruit topped with seeds and granola." },
      { itemID: 4, name: "Green Detox Juice", category: "Drinks", price: 5.50, description: "Kale, cucumber, lemon, and apple pressed juice." }
    ]
  },
  { 
    restID: 6, 
    name: 'Curry Corner', 
    hours: '12pm - 10pm', 
    tags: ['indian', 'spicy', 'vegetarian'], 
    logo: null, 
    rating: 4.3,
    address: '987 Bloor St, Edmonton, Canada',
    menu: [
      { itemID: 1, name: "Butter Chicken", category: "Curry", price: 13.99, description: "Creamy tomato-based curry with tender chicken pieces." },
      { itemID: 2, name: "Paneer Tikka Masala", category: "Vegetarian", price: 12.50, description: "Grilled paneer cubes in spiced masala sauce." },
      { itemID: 3, name: "Garlic Naan", category: "Sides", price: 3.99, description: "Soft Indian flatbread brushed with garlic butter." },
      { itemID: 4, name: "Mango Lassi", category: "Drinks", price: 4.99, description: "Refreshing yogurt-based mango drink." }
    ]
  },
  { 
    restID: 7, 
    name: 'The Grill Spot', 
    hours: '11am - 12am', 
    tags: ['barbecue', 'steakhouse', 'meat-lovers'], 
    logo: null, 
    rating: 4.6,
    address: '111 Front St, Winnipeg, Canada',
    menu: [
      { itemID: 1, name: "BBQ Ribs", category: "Mains", price: 19.99, description: "Slow-cooked ribs glazed in smoky BBQ sauce." },
      { itemID: 2, name: "Grilled Steak", category: "Mains", price: 22.50, description: "Perfectly seared steak with herb butter." },
      { itemID: 3, name: "Loaded Fries", category: "Sides", price: 7.25, description: "Fries topped with cheese, bacon, and scallions." },
      { itemID: 4, name: "House Beer", category: "Drinks", price: 6.00, description: "Locally brewed beer served cold." }
    ]
  },
  { 
    restID: 8, 
    name: 'Noodle Nest', 
    hours: '10am - 9pm', 
    tags: ['chinese', 'noodles', 'comfort-food'], 
    logo: null, 
    rating: 4.1,
    address: '222 Bay St, Halifax, Canada',
    menu: [
      { itemID: 1, name: "Beef Chow Mein", category: "Noodles", price: 11.99, description: "Stir-fried noodles with beef, veggies, and soy sauce." },
      { itemID: 2, name: "Sweet & Sour Chicken", category: "Mains", price: 12.50, description: "Crispy chicken tossed in tangy sauce." },
      { itemID: 3, name: "Spring Rolls", category: "Appetizers", price: 5.99, description: "Crispy rolls filled with cabbage and carrots." },
      { itemID: 4, name: "Jasmine Tea", category: "Drinks", price: 3.50, description: "Fragrant Chinese tea served hot." }
    ]
  },
  { 
    restID: 9, 
    name: 'Morning Mug', 
    hours: '6am - 4pm', 
    tags: ['coffee', 'breakfast', 'pastries'], 
    logo: null, 
    rating: 4.9,
    address: '333 Yonge St, Victoria, Canada',
    menu: [
      { itemID: 1, name: "Cappuccino", category: "Drinks", price: 4.25, description: "Espresso with steamed milk and foam." },
      { itemID: 2, name: "Croissant", category: "Pastries", price: 3.75, description: "Buttery and flaky French pastry." },
      { itemID: 3, name: "Egg Breakfast Sandwich", category: "Breakfast", price: 6.99, description: "Scrambled eggs and cheese on toasted ciabatta." },
      { itemID: 4, name: "Blueberry Muffin", category: "Pastries", price: 3.50, description: "Fresh-baked muffin with wild blueberries." }
    ]
  },
  { 
    restID: 10, 
    name: 'Falafel Factory', 
    hours: '9am - 10pm', 
    tags: ['mediterranean', 'vegan', 'wraps'], 
    logo: null, 
    rating: 4.4,
    address: '444 Granville St, Quebec City, Canada',
    menu: [
      { itemID: 1, name: "Falafel Wrap", category: "Wraps", price: 8.50, description: "Crispy falafel with hummus, lettuce, and tahini sauce." },
      { itemID: 2, name: "Greek Salad", category: "Salads", price: 7.99, description: "Fresh salad with feta, olives, and vinaigrette." },
      { itemID: 3, name: "Hummus Platter", category: "Appetizers", price: 6.75, description: "Creamy hummus with pita bread and olive oil drizzle." },
      { itemID: 4, name: "Baklava", category: "Desserts", price: 5.25, description: "Sweet layers of filo pastry filled with nuts and honey." }
    ]
  }
];

export function restById(id) {
  return restaurants[id - 1];
}
