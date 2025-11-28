import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Image1 from "../../assets/image5.png";
import Image2 from "../../assets/Hero.png";
import Image3 from "../../assets/image6.png";
import Image4 from "../../assets/image7.png";
import Image5 from "../../assets/image1.png";

const slides = [
  {
    image: Image1,
    subtext: "Fast, reliable shipping across China and Africa.",
  },
  {
    image: Image2,
    subtext: "Ensuring your goods arrive safely and on time.",
  },
  {
    image: Image3,
    subtext: "Seamless supply chain management solutions.",
  },
  {
    image: Image4,
    subtext: "Efficient logistics tailored for your business needs.",
  },
  {
    image: Image5,
    subtext: "Trusted by partners for secure and transparent trade.",
  },
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
 const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  const { image, subtext } = slides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div
        key={currentSlide}
        className="absolute inset-0 bg-cover bg-center animate-kenburns transition-all duration-1000"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2
                   bg-white/20 backdrop-blur-md hover:bg-white/40
                   p-3 rounded-full shadow-xl transition"
      >
        <LeftOutlined className="text-white text-xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2
                   bg-white/20 backdrop-blur-md hover:bg-white/40
                   p-3 rounded-full shadow-xl transition"
      >
        <RightOutlined className="text-white text-xl" />
      </button>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
        <h1 className="text-yellow-400 font-extrabold tracking-tight
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl animate-fadeSlide">
          YOUR LOGISTICS, OUR SPEED
        </h1>
        <p className="mt-4 text-yellow-400 max-w-2xl text-lg sm:text-xl md:text-2xl animate-fadeSlide delay-150">
          {subtext}
        </p>
        <button onClick={() => navigate("/login")}
          className="mt-8 px-10 py-4 text-lg font-bold rounded-md
                     bg-yellow-400 text-[#0F3952]
                     border border-solid border-[#0F3952]
                     shadow-2xl transition-all duration-300
                     hover:bg-yellow-300 hover:shadow-3xl"
        >
          Shipping Now →
        </button>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeSlide {
            animation: fadeSlide 0.8s ease-in-out forwards;
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
