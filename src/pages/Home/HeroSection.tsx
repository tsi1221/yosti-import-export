import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import Image1 from "../../assets/image5.png";
import Image2 from "../../assets/Hero.png";
import Image3 from "../../assets/image.png";
import Image4 from "../../assets/image3.png";

const slides = [
  {
    image: Image3,
    headline: "Where Logistics Meets Light-Speed",
    subtext: "Fast, reliable, and secure shipping solutions for your business.",
  },
  {
    image: Image4,
    headline: "Trusted Shipping Across the Globe",
    subtext: "We ensure your products reach their destination safely and on time.",
  },
  {
    image: Image1,
    headline: "Connecting Businesses Everywhere",
    subtext: "Seamless supply chain management at your fingertips.",
  },
  {
    image: Image2,
    headline: "Connecting Businesses Everywhere",
    subtext: "Seamless supply chain management at your fingertips.",
  },
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // auto slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const { image, headline, subtext } = slides[currentSlide];

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Always visible light black overlay */}
      <div className="absolute inset-0 bg-black/60 bg-opacity-40"></div>

      {/* Left / Right arrows */}
      <LeftOutlined
        onClick={prevSlide}
        style={{ color: "white" }}
        className="absolute left-5 top-1/2 text-white text-4xl cursor-pointer select-none transform -translate-y-1/2 hover:text-blue-400 transition-colors"
      />
      
      <RightOutlined
        onClick={nextSlide}
        style={{ color: "white" }}
        className="absolute right-5 top-1/2 text-white text-4xl cursor-pointer select-none transform -translate-y-1/2 hover:text-blue-400 transition-colors"
      />

      {/* Content container */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-12 max-w-5xl">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight transition-all duration-1000">
          {headline}
        </h3>
        <p className="text-sm sm:text-base md:text-lg mb-6 text-white transition-all duration-1000">
          {subtext}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            type="default"
            size="large"
            className="bg-blue-900 text-white border-none flex items-center gap-2 transition-colors duration-300 hover:bg-white hover:text-blue-900"
          >
            Shipping Now →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
