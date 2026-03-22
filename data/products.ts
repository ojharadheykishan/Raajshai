export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  description: string
  category: string
  ingredients: string[]
  benefits: string[]
  weight: string
  inStock: boolean
}

export const products: Product[] = [
  {
    id: 1,
    name: "Rose Sharbat",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1556911260-1e8c64922c6f?auto=format&fit=crop&w=700&q=80",
    description: "Premium quality rose sharbat made from fresh rose petals. Perfect for summer refreshment and traditional celebrations.",
    category: "Sharbat",
    ingredients: ["Rose Petals", "Sugar", "Water", "Citric Acid"],
    benefits: ["Cooling effect", "Rich in antioxidants", "Natural flavor"],
    weight: "750ml",
    inStock: true
  },
  {
    id: 2,
    name: "Kesar Sharbat",
    price: 449,
    originalPrice: 599,
    image: "https://images.unsplash.com/photo-1602623321679-f800ee734f23?auto=format&fit=crop&w=700&q=80",
    description: "Luxurious saffron-infused sharbat with authentic Kashmiri kesar. A royal treat for special occasions.",
    category: "Sharbat",
    ingredients: ["Saffron", "Sugar", "Water", "Cardamom"],
    benefits: ["Boosts immunity", "Enhances mood", "Natural energy"],
    weight: "750ml",
    inStock: true
  },
  {
    id: 3,
    name: "Khus Sharbat",
    price: 279,
    originalPrice: 349,
    image: "https://images.unsplash.com/photo-1563411956446-1e4d758bed3d?auto=format&fit=crop&w=700&q=80",
    description: "Refreshing vetiver root sharbat with natural cooling properties. Traditional summer beverage.",
    category: "Sharbat",
    ingredients: ["Vetiver Root", "Sugar", "Water", "Lemon"],
    benefits: ["Natural coolant", "Aids digestion", "Refreshing taste"],
    weight: "750ml",
    inStock: true
  },
  {
    id: 4,
    name: "Mango Sharbat",
    price: 329,
    originalPrice: 429,
    image: "https://images.unsplash.com/photo-1502741126161-b048400d7c88?auto=format&fit=crop&w=700&q=80",
    description: "Delicious mango-flavored sharbat made from Alphonso mangoes. Perfect for mango lovers.",
    category: "Sharbat",
    ingredients: ["Mango Pulp", "Sugar", "Water", "Citric Acid"],
    benefits: ["Rich in vitamins", "Natural sweetness", "Refreshing"],
    weight: "750ml",
    inStock: true
  },
  {
    id: 5,
    name: "Thandai Sharbat",
    price: 399,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1556911073-52527ac437fd?auto=format&fit=crop&w=700&q=80",
    description: "Traditional Holi special thandai with mixed nuts and spices. Perfect for festive celebrations.",
    category: "Sharbat",
    ingredients: ["Almonds", "Fennel", "Rose Petals", "Sugar", "Pepper"],
    benefits: ["Cooling effect", "Rich in nutrients", "Festive special"],
    weight: "750ml",
    inStock: true
  },
  {
    id: 6,
    name: "Jaljeera Sharbat",
    price: 199,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1589192183838-1e1dd9b5e8dc?auto=format&fit=crop&w=700&q=80",
    description: "Tangy and spicy jaljeera sharbat for instant refreshment. Great for digestion.",
    category: "Sharbat",
    ingredients: ["Cumin", "Mint", "Black Salt", "Tamarind", "Sugar"],
    benefits: ["Aids digestion", "Refreshing", "Spicy flavor"],
    weight: "750ml",
    inStock: true
  },
  {
    id: 7,
    name: "Aam Panna Sharbat",
    price: 249,
    originalPrice: 319,
    image: "https://images.unsplash.com/photo-1532635222-4ed0a8e9001a?auto=format&fit=crop&w=700&q=80",
    description: "Raw mango sharbat with mint and spices. Traditional Indian summer cooler.",
    category: "Sharbat",
    ingredients: ["Raw Mango", "Mint", "Black Salt", "Sugar", "Cumin"],
    benefits: ["Prevents heat stroke", "Rich in vitamins", "Cooling"],
    weight: "750ml",
    inStock: true
  },
  {
    id: 8,
    name: "Bel Sharbat",
    price: 269,
    originalPrice: 339,
    image: "https://images.unsplash.com/photo-1568148612973-26d7b6ea2508?auto=format&fit=crop&w=700&q=80",
    description: "Wood apple sharbat with natural cooling properties. Ayurvedic summer beverage.",
    category: "Sharbat",
    ingredients: ["Wood Apple", "Sugar", "Water", "Cardamom"],
    benefits: ["Cooling effect", "Aids digestion", "Natural remedy"],
    weight: "750ml",
    inStock: true
  },
  {
    id: 9,
    name: "Phalsa Sharbat",
    price: 319,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1579469573643-6245ac0f8d5e?auto=format&fit=crop&w=700&q=80",
    description: "Rare phalsa berry sharbat with unique tangy-sweet flavor. Seasonal specialty.",
    category: "Sharbat",
    ingredients: ["Phalsa Berries", "Sugar", "Water", "Black Salt"],
    benefits: ["Rich in antioxidants", "Cooling", "Unique taste"],
    weight: "750ml",
    inStock: true
  },
  {
    id: 10,
    name: "Sugarcane Sharbat",
    price: 179,
    originalPrice: 229,
    image: "https://images.unsplash.com/photo-1543128639-bcb2b8e8f1f3?auto=format&fit=crop&w=700&q=80",
    description: "Pure sugarcane juice sharbat with natural sweetness. Instant energy booster.",
    category: "Sharbat",
    ingredients: ["Sugarcane Juice", "Lemon", "Ginger", "Mint"],
    benefits: ["Instant energy", "Natural sweetener", "Refreshing"],
    weight: "750ml",
    inStock: true
  },
  {
    id: 11,
    name: "Coconut Sharbat",
    price: 289,
    originalPrice: 369,
    image: "https://images.unsplash.com/photo-1505576391880-6a67d2e8f262?auto=format&fit=crop&w=700&q=80",
    description: "Tender coconut water sharbat with natural electrolytes. Perfect hydration drink.",
    category: "Sharbat",
    ingredients: ["Coconut Water", "Sugar", "Lemon", "Mint"],
    benefits: ["Natural electrolytes", "Hydrating", "Refreshing"],
    weight: "750ml",
    inStock: true
  },
  {
    id: 12,
    name: "Mixed Fruit Sharbat",
    price: 349,
    originalPrice: 449,
    image: "https://images.unsplash.com/photo-1531647395198-a1c0df244ce4?auto=format&fit=crop&w=700&q=80",
    description: "Delightful blend of multiple fruits in one sharbat. Perfect for fruit lovers.",
    category: "Sharbat",
    ingredients: ["Mixed Fruits", "Sugar", "Water", "Citric Acid"],
    benefits: ["Multiple vitamins", "Natural flavors", "Refreshing"],
    weight: "750ml",
    inStock: true
  }
]

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}
