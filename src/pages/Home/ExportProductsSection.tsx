import React from "react";

const featuredExports = [
  {
    country: "Ethiopia",
    flag: "🇪🇹",
    exports: "Coffee, Oilseeds, Leather",
  },
  {
    country: "China",
    flag: "🇨🇳",
    exports: "Electronics, Machinery, Textiles",
  },
  {
    country: "Uganda",
    flag: "🇺🇬",
    exports: "Tea, Cocoa, Fish",
  },
  {
    country: "South Sudan",
    flag: "🇸🇸",
    exports: "Oil, Livestock",
  },
];

const ExportProductsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50" id="exports">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-10">
          Featured Export Products 
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredExports.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{item.flag}</div>
              <h3 className="text-xl font-medium text-black mb-2">
                {item.country}
              </h3>
              <p className="text-gray-700 text-sm">{item.exports}</p>
            </div>
          ))}
        </div>

        <a
          href="/exports"
          className="inline-block 400 text-[#002b5b] font-medium text-lg hover:underline"
        >
          Explore Full Export Product List →
        </a>
      </div>
    </section>
  );
};

export default ExportProductsSection;
