import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
;

// --- Project Card Data ---
interface ProjectCardProps {
  title: string;
  desc: string;
  img: string;
  index: number;
}

import project1 from "../../assets/construction.png";
import project2 from "../../assets/startup.png";
import project3 from "../../assets/agriculutre.png";
import project4 from "../../assets/package.png";
import project5 from "../../assets/toy.png";
import project6 from "../../assets/shiping.png";
import project7 from "../../assets/startup.png";

const projects = [
  { title: "Construction Machinery & Spare Parts", img: project1, desc: "Container shipments of construction machinery and spare parts to Ethiopia." },
  { title: "Factory Sourcing & Product Development", img: project2, desc: "Factory sourcing and product development for startups in Ethiopia." },
  { title: "Agricultural Tools & Irrigation Systems", img: project3, desc: "Supply of agricultural tools and irrigation systems to rural farming cooperatives." },
  { title: "Food & Beverage Packaging Solutions", img: project4, desc: "Packaging solutions delivered to clients in Kenya." },
  { title: "Educational Toys Logistics", img: project5, desc: "Toy sourcing and logistics for early childhood centers in Nigeria." },
  { title: "Door-to-Door Shipping", img: project6, desc: "Door-to-door coordination from Yiwu to Addis Ababa." },
  { title: "Long-Term Government Contracts", img: project7, desc: "Repeat shipments and contracts with government institutions." },
];

// --- ProjectCard Component ---
const ProjectCard: React.FC<ProjectCardProps> = ({ title, desc, img, index }) => {
  const [loading, setLoading] = useState(true);
  const slideFrom = index % 2 === 0 ? -100 : 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: slideFrom }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative min-w-[300px] w-[300px] bg-white shadow-lg rounded-2xl overflow-hidden border-4 border-[#0F3952] hover:shadow-2xl flex-shrink-0"
    >
      <div className="relative w-full h-52 overflow-hidden group">
        {loading && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}

        <img
          src={img}
          alt={title}
          loading="lazy"
          onLoad={() => setLoading(false)}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="p-5 relative z-10">
        <h3 className="text-xl font-bold text-[#0F3952] mb-2">{title}</h3>
        <p className="text-yellow-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

// --- OURPROJECT Page ---
const OURPROJECT: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleCards = 3;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    containerRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, projects.length - visibleCards));
    containerRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <div className="bg-white">

      {/* --- Header with curved blue background --- */}
      <header className="relative">
        <div className="absolute top-0 left-0 w-full h-[220px] sm:h-[300px] bg-[#0F3952] rounded-b-[90px] sm:rounded-b-full opacity-90 z-0"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-16 px-5 sm:px-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-6"
          >
            Our Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-yellow-400 text-lg sm:text-xl max-w-3xl"
          >
            Over the years, Yosti Import & Export Trading Co., Ltd. has successfully completed a wide range of sourcing and shipping projects for clients across Africa.
          </motion.p>
        </div>
      </header>

      {/* --- Projects Carousel --- */}
      <section className="w-full bg-[#F8FAFC] py-12 px-5 md:px-16 mb-16 relative">
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-20"
            disabled={currentIndex === 0}
          >
            <LeftOutlined className="text-[#0F3952]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-20"
            disabled={currentIndex >= projects.length - visibleCards}
          >
            <RightOutlined className="text-[#0F3952]" />
          </button>

          {/* Cards container */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-hidden scroll-smooth touch-pan-x"
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={i}
                title={project.title}
                desc={project.desc}
                img={project.img}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OURPROJECT;
