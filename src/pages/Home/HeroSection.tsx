import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Image1 from "../../assets/image5.png";
import Image2 from "../../assets/Hero.png";
import Image3 from "../../assets/image6.png";
import Image4 from "../../assets/image7.png";
import Image5 from "../../assets/image1.png";

const slides = [
  { image: Image1 },
  { image: Image2 },
  { image: Image3 },
  { image: Image4 },
  { image: Image5 },
];

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[current].image})` }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 -translate-y-1/2 p-4 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 shadow-lg transition z-10"
      >
        <LeftOutlined className="text-white text-2xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 -translate-y-1/2 p-4 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 shadow-lg transition z-10"
      >
        <RightOutlined className="text-white text-2xl" />
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full pl-10 md:pl-32 lg:pl-40">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-yellow-400 font-extrabold text-[3.5rem] sm:text-[3.8rem] md:text-[3.9rem] mb-8"
        >
          Bridging Business Between Africa and China
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-left max-w-3xl space-y-6"
        >
          <p className="text-yellow-400 text-lg sm:text-xl md:text-2xl">
            Yosti Import & Export Trading Co., Ltd. has successfully completed a wide range of sourcing and shipping projects for clients across Africa.
          </p>
          <p className="text-yellow-400 text-lg sm:text-xl md:text-2xl">
            Ensuring your goods arrive safely and on time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap gap-6 mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="px-12 py-4 bg-yellow-400 text-[#0F3952] font-bold rounded-md border border-[#0F3952] shadow-2xl hover:bg-yellow-300 transition-all duration-300"
          >
            Start Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/contact")}
            className="px-12 py-4 bg-yellow-400 text-[#0F3952] font-bold rounded-md border border-[#0F3952] shadow-2xl hover:bg-yellow-300 transition-all duration-300"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
