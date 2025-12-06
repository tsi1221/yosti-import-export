// mockData.ts

interface Country{
  country_id: string,
  country_name: string,
  iso_code:string
}
export const countries:Country[] = [
  { country_id: "1", country_name: "Ethiopia", iso_code: "ET" },
  { country_id: "2", country_name: "China", iso_code: "CN" },
  { country_id: "3", country_name: "Uganda", iso_code: "UG" },
  { country_id: "4", country_name: "South Sudan", iso_code: "SS" },
];

// Categories
export const categories = [
  { category_id: "1", country_id: "1", category_name: "Coffee", description: "Specialty Ethiopian coffee", hs_code: "0901" },
  { category_id: "2", country_id: "1", category_name: "Oilseeds", description: "High-quality Ethiopian oilseeds", hs_code: "1207" },
  { category_id: "3", country_id: "2", category_name: "Electronics", description: "Popular electronics from China", hs_code: "8517" },
  { category_id: "4", country_id: "3", category_name: "Tea", description: "Premium Ugandan tea", hs_code: "0902" },
  { category_id: "5", country_id: "4", category_name: "Grains", description: "South Sudan grains", hs_code: "1006" },
];

export interface Product {
  product_id: string,
  category_id: string,
  product_name: string,
  product_description: string,
  hs_code: string,
  images: string[]
  rating: number,
  producer: string,
  country_id?:string
}
// Products (50)
export const products:Product[] = [
  // Coffee (Ethiopia)
  {
    product_id: "1",
    category_id: "1",
    product_name: "Yirgacheffe Coffee",
    product_description: "Floral and citrus notes – specialty coffee from Yirgacheffe, Ethiopia.",
    hs_code: "0901",
    images: [
      "https://images.unsplash.com/photo-1523875194681-bedd468c58bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585155771954-b0c8c7a8f7b2?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 5,
    producer: "Yirgacheffe Coffee Farmers Co."
  },
  {
    product_id: "2",
    category_id: "1",
    product_name: "Sidamo Coffee",
    product_description: "Berry and chocolate flavor – premium Ethiopian Sidamo coffee.",
    hs_code: "0901",
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    producer: "Sidamo Specialty Co."
  },
  {
    product_id: "3",
    category_id: "1",
    product_name: "Guji Coffee",
    product_description: "Smooth, rich, and fruity – Guji coffee from Oromia region.",
    hs_code: "0901",
    images: [
      "https://images.unsplash.com/photo-1525302220184-6eebd9f9c2f5?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    producer: "Guji Coffee Farmers Union"
  },
  {
    product_id: "4",
    category_id: "1",
    product_name: "Limu Coffee",
    product_description: "Citrus notes, smooth coffee from Limu.",
    hs_code: "0901",
    images: [
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6,
    producer: "Limu Coffee Farmers Union"
  },
  {
    product_id: "5",
    category_id: "1",
    product_name: "Harar Coffee",
    product_description: "Full-bodied Harar coffee with fruity aroma.",
    hs_code: "0901",
    images: [
      "https://images.unsplash.com/photo-1509046904770-339f9a5a40d9?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    producer: "Harar Coffee Farmers Co."
  },
  {
    product_id: "6",
    category_id: "1",
    product_name: "Jimma Coffee",
    product_description: "Rich Jimma coffee with chocolate notes.",
    hs_code: "0901",
    images: [
      "https://images.unsplash.com/photo-1546897349-015d6f1d98b5?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    producer: "Jimma Coffee Growers Co."
  },
  {
    product_id: "7",
    category_id: "1",
    product_name: "Bale Coffee",
    product_description: "Smooth coffee from Bale region, Ethiopia.",
    hs_code: "0901",
    images: [
      "https://images.unsplash.com/photo-1549887533-f6eea2f2eb3e?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6,
    producer: "Bale Coffee Farmers Union"
  },
  {
    product_id: "8",
    category_id: "1",
    product_name: "Gedeo Coffee",
    product_description: "Fruity and floral notes from Gedeo zone.",
    hs_code: "0901",
    images: [
      "https://images.unsplash.com/photo-1543832929-38d0edcfd1c6?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    producer: "Gedeo Coffee Cooperative"
  },

  // Oilseeds (Ethiopia)
  {
    product_id: "9",
    category_id: "2",
    product_name: "Sesame Seeds",
    product_description: "Premium Ethiopian sesame seeds.",
    hs_code: "1207",
    images: [
      "https://images.unsplash.com/photo-1587316745621-3757c7076f5f?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    producer: "Ethiopian Oilseed Exporters"
  },
  {
    product_id: "10",
    category_id: "2",
    product_name: "Sunflower Seeds",
    product_description: "High-quality sunflower seeds from Ethiopia.",
    hs_code: "1206",
    images: [
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6,
    producer: "Ethiopian Oilseed Exporters"
  },
  {
    product_id: "11",
    category_id: "2",
    product_name: "Chickpeas",
    product_description: "Organic Ethiopian chickpeas.",
    hs_code: "0713",
    images: [
      "https://images.unsplash.com/photo-1605522095648-6b75994836af?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.5,
    producer: "Ethiopian Legume Co."
  },
  {
    product_id: "12",
    category_id: "2",
    product_name: "Groundnuts",
    product_description: "High-quality Ethiopian peanuts.",
    hs_code: "1202",
    images: [
      "https://images.unsplash.com/photo-1598514982630-5b0c1ed5c27f?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    producer: "Ethiopian Legume Co."
  },
  {
    product_id: "13",
    category_id: "2",
    product_name: "Flax Seeds",
    product_description: "Premium Ethiopian flax seeds.",
    hs_code: "1204",
    images: [
      "https://images.unsplash.com/photo-1598515028517-2df42f7c2e90?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6,
    producer: "Ethiopian Oilseed Exporters"
  },
  {
    product_id: "14",
    category_id: "2",
    product_name: "Pumpkin Seeds",
    product_description: "Organic Ethiopian pumpkin seeds.",
    hs_code: "1207",
    images: [
      "https://images.unsplash.com/photo-1598515075120-d9ec4a98d3b0?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.5,
    producer: "Ethiopian Oilseed Exporters"
  },
  {
    product_id: "15",
    category_id: "2",
    product_name: "Coriander Seeds",
    product_description: "Fresh Ethiopian coriander seeds.",
    hs_code: "0910",
    images: [
      "https://images.unsplash.com/photo-1598515100640-4b6f1f8c7f6f?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.4,
    producer: "Ethiopian Spice Co."
  },
  {
    product_id: "16",
    category_id: "2",
    product_name: "Fenugreek Seeds",
    product_description: "Organic fenugreek from Ethiopia.",
    hs_code: "1209",
    images: [
      "https://images.unsplash.com/photo-1598515123453-fc7a8b1d8c9f?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.5,
    producer: "Ethiopian Spice Co."
  },

  // Electronics (China)
  {
    product_id: "17",
    category_id: "3",
    product_name: "Smartphone X1",
    product_description: "High-performance smartphone with 128GB storage.",
    hs_code: "8517",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    producer: "Chinese Electronics Co."
  },
  {
    product_id: "18",
    category_id: "3",
    product_name: "Laptop Y Pro",
    product_description: "Ultra-light laptop for work and study.",
    hs_code: "8471",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    producer: "Chinese Electronics Co."
  },
  {
    product_id: "19",
    category_id: "3",
    product_name: "Tablet Z Plus",
    product_description: "Compact tablet device with stylus support.",
    hs_code: "8471",
    images: [
      "https://images.unsplash.com/photo-1510557880182-3f8ffd0a5b6b?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.3,
    producer: "Chinese Electronics Co."
  },
  {
    product_id: "20",
    category_id: "3",
    product_name: "Wireless Earbuds A",
    product_description: "Noise-cancelling wireless earbuds.",
    hs_code: "8518",
    images: [
      "https://images.unsplash.com/photo-1598300050486-9f8d67ae4d09?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    producer: "AudioTech China"
  },

  // Tea (Uganda)
  {
    product_id: "21",
    category_id: "4",
    product_name: "Ugandan Black Tea",
    product_description: "Finest quality tea from Uganda.",
    hs_code: "0902",
    images: [
      "https://images.unsplash.com/photo-1583336666189-55086b1d7e25?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.4,
    producer: "Uganda Tea Farmers Co."
  },
  {
    product_id: "22",
    category_id: "4",
    product_name: "Ugandan Green Tea",
    product_description: "Fresh green tea from Uganda.",
    hs_code: "0902",
    images: [
      "https://images.unsplash.com/photo-1575995449737-dbb1535a01d6?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.2,
    producer: "Uganda Tea Farmers Co."
  },
  {
    product_id: "23",
    category_id: "4",
    product_name: "Ugandan Oolong Tea",
    product_description: "Smooth Oolong tea with subtle aroma.",
    hs_code: "0903",
    images: [
      "https://images.unsplash.com/photo-1580906850477-d2f2fc9b302a?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.3,
    producer: "Oolong Tea Uganda"
  },

  // Grains (South Sudan)
  {
    product_id: "24",
    category_id: "5",
    product_name: "South Sudan Sorghum",
    product_description: "Nutritious sorghum grains.",
    hs_code: "1007",
    images: [
      "https://images.unsplash.com/photo-1506801310323-534be5e7bb10?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.5,
    producer: "South Sudan Grains Co."
  },
  {
    product_id: "25",
    category_id: "5",
    product_name: "South Sudan Maize",
    product_description: "Fresh maize grains from South Sudan.",
    hs_code: "1005",
    images: [
      "https://images.unsplash.com/photo-1562003389-3fcf52e28a14?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.4,
    producer: "South Sudan Maize Co."
  },
  {
    product_id: "26",
    category_id: "5",
    product_name: "South Sudan Millet",
    product_description: "Organic millet grains.",
    hs_code: "1007",
    images: [
      "https://images.unsplash.com/photo-1585241936935-ee0ae42b8960?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.3,
    producer: "South Sudan Millet Farmers"
  },

  // Continue adding 24 more products similarly to reach 50...
];
