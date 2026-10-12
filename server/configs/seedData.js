import Product from '../models/product.js'

export const defaultProducts = [
  // Vegetables
  {
    _id: "gd46g23h",
    name: "Potato 500g",
    category: "Vegetables",
    price: 25,
    offerPrice: 20,
    image: [
      "/images/products/potato_image_1.png",
      "/images/products/potato_image_2.png",
      "/images/products/potato_image_3.png",
      "/images/products/potato_image_4.png"
    ],
    description: [
      "Fresh and organic",
      "Rich in carbohydrates",
      "Ideal for curries and fries"
    ],
    inStock: true
  },
  {
    _id: "gd47g34h",
    name: "Tomato 1 kg",
    category: "Vegetables",
    price: 40,
    offerPrice: 35,
    image: ["/images/products/tomato_image.png"],
    description: [
      "Juicy and ripe",
      "Rich in Vitamin C",
      "Perfect for salads and sauces",
      "Farm fresh quality"
    ],
    inStock: true
  },
  {
    _id: "gd48g45h",
    name: "Carrot 500g",
    category: "Vegetables",
    price: 30,
    offerPrice: 28,
    image: ["/images/products/carrot_image.png"],
    description: [
      "Sweet and crunchy",
      "Good for eyesight",
      "Ideal for juices and salads"
    ],
    inStock: true
  },
  {
    _id: "gd49g56h",
    name: "Spinach 500g",
    category: "Vegetables",
    price: 18,
    offerPrice: 15,
    image: ["/images/products/spinach_image_1.png"],
    description: [
      "Rich in iron",
      "High in vitamins",
      "Perfect for soups and salads"
    ],
    inStock: true
  },
  {
    _id: "gd50g67h",
    name: "Onion 500g",
    category: "Vegetables",
    price: 22,
    offerPrice: 19,
    image: ["/images/products/onion_image_1.png"],
    description: [
      "Fresh and pungent",
      "Perfect for cooking",
      "A kitchen staple"
    ],
    inStock: true
  },

  // Fruits
  {
    _id: "ek51j12k",
    name: "Apple 1 kg",
    category: "Fruits",
    price: 120,
    offerPrice: 110,
    image: ["/images/products/apple_image.png"],
    description: [
      "Crisp and juicy",
      "Rich in fiber",
      "Boosts immunity",
      "Perfect for snacking and desserts",
      "Organic and farm fresh"
    ],
    inStock: true
  },
  {
    _id: "ek52j23k",
    name: "Orange 1 kg",
    category: "Fruits",
    price: 80,
    offerPrice: 75,
    image: ["/images/products/orange_image.png"],
    description: [
      "Juicy and sweet",
      "Rich in Vitamin C",
      "Perfect for juices and salads"
    ],
    inStock: true
  },
  {
    _id: "ek53j34k",
    name: "Banana 1 kg",
    category: "Fruits",
    price: 50,
    offerPrice: 45,
    image: ["/images/products/banana_image_1.png"],
    description: [
      "Sweet and ripe",
      "High in potassium",
      "Great for smoothies and snacking"
    ],
    inStock: true
  },
  {
    _id: "ek54j45k",
    name: "Mango 1 kg",
    category: "Fruits",
    price: 150,
    offerPrice: 140,
    image: ["/images/products/mango_image_1.png"],
    description: [
      "Sweet and flavorful",
      "Perfect for smoothies and desserts",
      "Rich in Vitamin A"
    ],
    inStock: true
  },
  {
    _id: "ek55j56k",
    name: "Grapes 500g",
    category: "Fruits",
    price: 70,
    offerPrice: 65,
    image: ["/images/products/grapes_image_1.png"],
    description: [
      "Fresh and juicy",
      "Rich in antioxidants",
      "Perfect for snacking and fruit salads"
    ],
    inStock: true
  },

  // Dairy
  {
    _id: "ek56j67k",
    name: "Amul Milk 1L",
    category: "Dairy",
    price: 60,
    offerPrice: 55,
    image: ["/images/products/amul_milk_image.png"],
    description: [
      "Pure and fresh",
      "Rich in calcium",
      "Ideal for tea, coffee, and desserts",
      "Trusted brand quality"
    ],
    inStock: true
  },
  {
    _id: "ek57j78k",
    name: "Paneer 200g",
    category: "Dairy",
    price: 90,
    offerPrice: 85,
    image: ["/images/products/paneer_image.png"],
    description: [
      "Soft and fresh",
      "Rich in protein",
      "Ideal for curries and snacks"
    ],
    inStock: true
  },
  {
    _id: "ek58j89k",
    name: "Eggs 12 pcs",
    category: "Dairy",
    price: 90,
    offerPrice: 85,
    image: ["/images/products/eggs_image.png"],
    description: [
      "Farm fresh",
      "Rich in protein",
      "Ideal for breakfast and baking"
    ],
    inStock: true
  },
  {
    _id: "ek59j90k",
    name: "Paneer 200g",
    category: "Dairy",
    price: 90,
    offerPrice: 85,
    image: ["/images/products/paneer_image_2.png"],
    description: [
      "Soft and fresh",
      "Rich in protein",
      "Ideal for curries and snacks"
    ],
    inStock: true
  },
  {
    _id: "ek60j01k",
    name: "Cheese 200g",
    category: "Dairy",
    price: 140,
    offerPrice: 130,
    image: ["/images/products/cheese_image.png"],
    description: [
      "Creamy and delicious",
      "Perfect for pizzas and sandwiches",
      "Rich in calcium"
    ],
    inStock: true
  },

  // Drinks
  {
    _id: "ek61j12k",
    name: "Coca-Cola 1.5L",
    category: "Drinks",
    price: 80,
    offerPrice: 75,
    image: ["/images/products/coca_cola_image.png"],
    description: [
      "Refreshing and fizzy",
      "Perfect for parties and gatherings",
      "Best served chilled"
    ],
    inStock: true
  },
  {
    _id: "ek62j23k",
    name: "Pepsi 1.5L",
    category: "Drinks",
    price: 78,
    offerPrice: 73,
    image: ["/images/products/pepsi_image.png"],
    description: [
      "Chilled and refreshing",
      "Perfect for celebrations",
      "Best served cold"
    ],
    inStock: true
  },
  {
    _id: "ek63j34k",
    name: "Sprite 1.5L",
    category: "Drinks",
    price: 79,
    offerPrice: 74,
    image: ["/images/products/sprite_image_1.png"],
    description: [
      "Refreshing citrus taste",
      "Perfect for hot days",
      "Best served chilled"
    ],
    inStock: true
  },
  {
    _id: "ek64j45k",
    name: "Fanta 1.5L",
    category: "Drinks",
    price: 77,
    offerPrice: 72,
    image: ["/images/products/fanta_image_1.png"],
    description: [
      "Sweet and fizzy",
      "Great for parties and gatherings",
      "Best served cold"
    ],
    inStock: true
  },
  {
    _id: "ek65j56k",
    name: "7 Up 1.5L",
    category: "Drinks",
    price: 76,
    offerPrice: 71,
    image: ["/images/products/seven_up_image_1.png"],
    description: [
      "Refreshing lemon-lime flavor",
      "Perfect for refreshing",
      "Best served chilled"
    ],
    inStock: true
  },

  // Grains
  {
    _id: "ek66j67k",
    name: "Basmati Rice 5kg",
    category: "Grains",
    price: 550,
    offerPrice: 520,
    image: ["/images/products/basmati_rice_image.png"],
    description: [
      "Long grain and aromatic",
      "Perfect for biryani and pulao",
      "Premium quality"
    ],
    inStock: true
  },
  {
    _id: "ek67j78k",
    name: "Wheat Flour 5kg",
    category: "Grains",
    price: 250,
    offerPrice: 230,
    image: ["/images/products/wheat_flour_image.png"],
    description: [
      "High-quality whole wheat",
      "Soft and fluffy rotis",
      "Rich in nutrients"
    ],
    inStock: true
  },
  {
    _id: "ek68j89k",
    name: "Organic Quinoa 500g",
    category: "Grains",
    price: 450,
    offerPrice: 420,
    image: ["/images/products/quinoa_image.png"],
    description: [
      "High in protein and fiber",
      "Gluten-free",
      "Rich in vitamins and minerals"
    ],
    inStock: true
  },
  {
    _id: "ek69j90k",
    name: "Brown Rice 1kg",
    category: "Grains",
    price: 120,
    offerPrice: 110,
    image: ["/images/products/brown_rice_image.png"],
    description: [
      "Whole grain and nutritious",
      "Helps in weight management",
      "Good source of magnesium"
    ],
    inStock: true
  },
  {
    _id: "ek70j01k",
    name: "Barley 1kg",
    category: "Grains",
    price: 150,
    offerPrice: 140,
    image: ["/images/products/barley_image.png"],
    description: [
      "Rich in fiber",
      "Helps improve digestion",
      "Low in fat and cholesterol"
    ],
    inStock: true
  },

  // Bakery
  {
    _id: "bk01a24z",
    name: "Brown Bread 400g",
    category: "Bakery",
    price: 40,
    offerPrice: 35,
    image: ["/images/products/brown_bread_image.png"],
    description: [
      "Soft and healthy",
      "Made from whole wheat",
      "Ideal for breakfast and sandwiches"
    ],
    inStock: true
  },
  {
    _id: "bk02b30y",
    name: "Butter Croissant 100g",
    category: "Bakery",
    price: 50,
    offerPrice: 45,
    image: ["/images/products/butter_croissant_image.png"],
    description: [
      "Flaky and buttery",
      "Freshly baked",
      "Perfect for breakfast or snacks"
    ],
    inStock: true
  },
  {
    _id: "bk03c31x",
    name: "Chocolate Cake 500g",
    category: "Bakery",
    price: 350,
    offerPrice: 325,
    image: ["/images/products/chocolate_cake_image.png"],
    description: [
      "Rich and moist",
      "Made with premium cocoa",
      "Ideal for celebrations and parties"
    ],
    inStock: true
  },
  {
    _id: "bk04d32w",
    name: "Whole Bread 400g",
    category: "Bakery",
    price: 45,
    offerPrice: 40,
    image: ["/images/products/whole_wheat_bread_image.png"],
    description: [
      "Healthy and nutritious",
      "Made with whole wheat flour",
      "Ideal for sandwiches and toast"
    ],
    inStock: true
  },
  {
    _id: "bk05e33v",
    name: "Vanilla Muffins 6 pcs",
    category: "Bakery",
    price: 100,
    offerPrice: 90,
    image: ["/images/products/vanilla_muffins_image.png"],
    description: [
      "Soft and fluffy",
      "Perfect for a quick snack",
      "Made with real vanilla"
    ],
    inStock: true
  },

  // Instant
  {
    _id: "in01f25u",
    name: "Maggi Noodles 280g",
    category: "Instant",
    price: 55,
    offerPrice: 50,
    image: ["/images/products/maggi_image.png"],
    description: [
      "Instant and easy to cook",
      "Delicious taste",
      "Popular among kids and adults"
    ],
    inStock: true
  },
  {
    _id: "in02g26t",
    name: "Top Ramen 270g",
    category: "Instant",
    price: 45,
    offerPrice: 40,
    image: ["/images/products/top_ramen_image.png"],
    description: [
      "Quick and easy to prepare",
      "Spicy and flavorful",
      "Loved by college students and families"
    ],
    inStock: true
  },
  {
    _id: "in03h27s",
    name: "Knorr Cup Soup 70g",
    category: "Instant",
    price: 35,
    offerPrice: 30,
    image: ["/images/products/knorr_soup_image.png"],
    description: [
      "Convenient for on-the-go",
      "Healthy and nutritious",
      "Variety of flavors"
    ],
    inStock: true
  },
  {
    _id: "in04i28r",
    name: "Yippee Noodles 260g",
    category: "Instant",
    price: 50,
    offerPrice: 45,
    image: ["/images/products/yippee_image.png"],
    description: [
      "Non-fried noodles for healthier choice",
      "Tasty and filling",
      "Convenient for busy schedules"
    ],
    inStock: true
  },
  {
    _id: "in05j29q",
    name: "Oats Noodles 72g",
    category: "Instant",
    price: 40,
    offerPrice: 35,
    image: ["/images/products/maggi_oats_image.png"],
    description: [
      "Healthy alternative with oats",
      "Good for digestion",
      "Perfect for breakfast or snacks"
    ],
    inStock: true
  }
]

export const seedInitialProducts = async () => {
  try {
    const count = await Product.countDocuments()
    if (count === 0) {
      console.log('Seeding initial products into database...')
      await Product.insertMany(defaultProducts)
      console.log(`Successfully seeded ${defaultProducts.length} products!`)
    }
  } catch (err) {
    console.warn('Auto-seed products error:', err.message)
  }
}
