import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import aboutImg from "../../assets/image1.png";
import headerImg from "../../assets/about2.png";

const AboutSection: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full bg-gray-50" id="about">

      {/* Hero Header */}
      <div className="w-full h-[65vh] relative">
        {loading ? (
          <Skeleton.Image active className="w-full h-full" />
        ) : (
          <img
            src={headerImg}
            alt="About Header"
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlay Text */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#FFD700] text-center leading-snug drop-shadow-lg">
            Connecting Markets Between China and Africa
          </h1>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mt-12 mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F3952]">
          About Us
        </h2>
        <div className="w-20 h-1 bg-[#FFD700] mx-auto rounded-full mt-2"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-10 mb-16">

        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <p
            className="text-[#0F3952] text-base md:text-lg leading-relaxed mb-4 animate-fadeIn opacity-0"
            style={{ animation: "fadeIn 0.9s ease-in-out forwards" }}
          >
            Yosti Import & Export bridges China and Africa by offering reliable
            sourcing, inspection, logistics, and after-sales support tailored for
            businesses and individuals.
          </p>

          <p
            className="text-[#0F3952] text-base md:text-lg leading-relaxed animate-fadeIn opacity-0"
            style={{ animation: "fadeIn 1.1s ease-in-out forwards" }}
          >
            Our commitment to transparency, affordability, and seamless
            communication has positioned us as a trusted partner for international
            trade solutions.
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          {loading ? (
            <Skeleton.Image active className="w-full h-80 rounded-lg" />
          ) : (
            <img
              src={aboutImg}
              alt="About"
              className="w-full h-80 object-cover border-2 border-[#FFD700] rounded-lg shadow-lg animate-fadeIn opacity-0"
              style={{ animation: "fadeIn 1.2s ease-in-out forwards" }}
            />
          )}
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 md:px-6 mb-20">
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#0F3952]">
          Our Mission
        </h3>
        <p className="text-[#0F3952] text-base md:text-lg leading-relaxed max-w-3xl">
          To deliver secure, transparent, and efficient import-export solutions
          that strengthen trade between China and Africa — with a special focus
          on empowering businesses in Ethiopia.
        </p>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.8s ease-in-out forwards; }
        `}
      </style>
    </section>
  );
};

export default AboutSection;
