import  { useState, useEffect } from "react";
import { Skeleton } from "antd";

// Example product images/icons
import solarImg from "../../assets/solar.png";
import tractorImg from "../../assets/shiping.png";
import gadgetImg from "../../assets/image7.png";
import brushImg from "../../assets/image6.png";
import bookImg from "../../assets/image5.png";
import recycleImg from "../../assets/image3.png";
import brickImg from "../../assets/image2.png";
import smartHomeImg from "../../assets/image1.png";
import bagImg from "../../assets/oil.png";
import carImg from "../../assets/construction.png";

// Dark Blue Background Color
const CARD_BACKGROUND_COLOR = "#0F3952";
// Yellow Accent Color
// const ACCENT_COLOR = "#FFD700";

interface ProductItem {
  name: string;
  category: string;
  image: string;
  rating: number;
}

const topProducts: ProductItem[] = [
  { name: "Solar Products", category: "Energy Solutions", image: solarImg, rating: 5.0 },
  { name: "Agricultural Tools", category: "Farming Tech", image: tractorImg, rating: 5.0 },
  { name: "Mini Electronics", category: "Portable Gadgets", image: gadgetImg, rating: 5.0 },
  { name: "Beauty Tools", category: "Personal Care", image: brushImg, rating: 4.8 },
  { name: "Educational Toys", category: "Learning Kits", image: bookImg, rating: 4.9 },
  { name: "Eco-friendly Packaging", category: "Sustainable Solutions", image: recycleImg, rating: 5.0 },
  { name: "Construction Materials", category: "Building Essentials", image: brickImg, rating: 4.8 },
  { name: "Smart Home Devices", category: "Home Automation", image: smartHomeImg, rating: 4.9 },
  { name: "Fashion Accessories", category: "Apparel & Style", image: bagImg, rating: 4.8 },
  { name: "Auto Spare Parts", category: "Vehicle Components", image: carImg, rating: 5.0 },
];

const ProductsSection: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const CARD_BG_COLOR_CLASS = 'bg-white';
  const DARK_TEXT_COLOR_CLASS = 'text-gray-600';
  const PRODUCT_NAME_COLOR_CLASS = 'text-gray-900';

  return (
    <section className="py-14 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#FFD700] mb-2">
          High-Demand Products to Import in 2025
        </h2>

        {/* Divider */}
        <div className="w-24 h-1 mx-auto mb-10 rounded-full bg-[#FFD700] shadow-lg"></div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`p-4 ${CARD_BACKGROUND_COLOR} rounded-xl shadow-lg animate-pulse`}
                  style={{ backgroundColor: CARD_BACKGROUND_COLOR }}
                >
                  <div className="w-full h-72 mb-3 rounded-xl overflow-hidden">
                     <Skeleton.Image className="w-full h-full" active />
                  </div>
                  <div className="text-left p-2">
                    <Skeleton active title={false} paragraph={{ rows: 2, width: ['70%', '100%'] }} />
                  </div>
                </div>
              ))
            : topProducts.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative ${CARD_BG_COLOR_CLASS} rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
                >
                  <div 
                    className="relative w-full h-72 rounded-t-xl overflow-hidden flex items-center justify-center p-4"
                    style={{ backgroundColor: CARD_BACKGROUND_COLOR }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  </div>

                  <div className="p-4 text-left">
                    <div className="flex justify-between items-center mb-1">
                      <p className={`text-sm font-medium ${DARK_TEXT_COLOR_CLASS}`}>{item.category}</p>
                      <div className="flex items-center text-sm font-semibold">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className={DARK_TEXT_COLOR_CLASS}>{item.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h3 className={`text-lg font-extrabold ${PRODUCT_NAME_COLOR_CLASS}`}>
                      {item.name}
                    </h3>
                  </div>
                </div>
              ))}
        </div>

        <a
          href="/products"
          className="inline-block mt-10 text-lg font-bold transition-colors"
          style={{ color: CARD_BACKGROUND_COLOR }}
        >
          Explore Full Product List →
        </a>
      </div>
    </section>
  );
};

export default ProductsSection;
