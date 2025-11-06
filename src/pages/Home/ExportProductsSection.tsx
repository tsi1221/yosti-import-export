import React from "react";
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
  return (
    <section className="py-14 bg-gray-50" id="exports">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-3">
          Featured Export Products
        </h2>
 <div className="w-20 h-0.5 bg-[#0021f5b4] mx-auto rounded-full mb-10"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 justify-center">
          {featuredExports.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 flex flex-col items-center hover:shadow-2xl transition-transform transform hover:scale-[0.999]"
            >
              <img
                  src={item.image}
                  alt={`${item.country} exports`}
                  className="w-72 h-44 object-contain rounded-xl transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
                />
              <h3 className="text-xl font-medium text-black mb-2">
                {item.flag} {item.country}
              </h3>
              <p className="text-gray-700 text-base">{item.exports}</p>
            </div>
          ))}
        </div>

        <a
          href="/exports"
          className="inline-block mt-10 text-[#0021f5b4] font-medium text-lg hover:underline transition-colors duration-300"
        >
          Explore Full Export Product List →
        </a>
      </div>
    </section>
  );
};

export default ExportProductsSection;
