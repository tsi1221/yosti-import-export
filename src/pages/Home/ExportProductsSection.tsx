import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import coffeeImg from "../../assets/coffee.png";
import clothImg from "../../assets/cloths.png";
import oilImg from "../../assets/oil.png";
import electronicsImg from "../../assets/Electronics.png";

const featuredExports = [
  {
    country: "Ethiopia",
    flag: "🇪🇹",
    exports: "Coffee, Oilseeds, Leather",
    image: coffeeImg,
  },
  {
    country: "China",
    flag: "🇨🇳",
    exports: "Electronics, Machinery, Textiles",
    image: electronicsImg,
  },
  {
    country: "Uganda",
    flag: "🇺🇬",
    exports: "Cloths, Fabrics",
    image: clothImg,
  },
  {
    country: "South Sudan",
    flag: "🇸🇸",
    exports: "Oil, Livestock",
    image: oilImg,
  },
];

const ExportProductsSection: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-gray-50" id="exports">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
        {/* Section Title */}
         <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F3952] mb-3">
          Featured Export Products
        </h2> 

        {/* Divider */}
        <div className="w-24 h-1 bg-[#0F3952] mx-auto rounded-full mb-12 shadow-lg"></div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="p-6 bg-white rounded-2xl shadow-md">
                    <Skeleton.Image className="w-full h-44 rounded-xl mb-5" active />
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </div>
                ))
            : featuredExports.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl p-6 flex flex-col items-center
                             shadow-md transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                  style={{
                    borderWidth: "4px",
                    borderStyle: "solid",
                    borderImage: "linear-gradient(to right, #0F3952 50%, #FFD700 50%) 1",
                  }}
                >
                  {/* Image */}
                  <div className="relative w-full h-44 mb-5">
                    <img
                      src={item.image}
                      alt={`${item.country} exports`}
                      className="w-full h-full object-contain rounded-xl transition-transform duration-500 ease-in-out hover:scale-110"
                    />
                  </div>

                  {/* Country & Flag */}
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#0F3952] mb-2">
                    {item.flag} {item.country}
                  </h3>

                  {/* Exports */}
                  <p className="text-gray-700 text-center text-base">{item.exports}</p>
                </div>
              ))}
        </div>

        {/* CTA Link */}
        <a
          href="/products"
          className="inline-block mt-10 text-[#0F3952] font-bold text-lg"
        >
          Explore Full Export Product List →
        </a>
      </div>
    </section>
  );
};

export default ExportProductsSection;
