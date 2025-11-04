import React from "react";
import { Button } from "antd";
import Image from "../../assets/image2.png";
import { RightOutlined, RocketOutlined } from "@ant-design/icons";

const HeroSection: React.FC = () => {
  return (
     <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${Image})`,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black-800 bg-opacity-50"></div>

      {/* Content container */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-12 max-w-5xl">
        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
          Where Logistics Meets Light-Speed
        </h1>

        {/* Subheadline / description */}
        

        {/* Call-to-Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            type="default"
            size="large"
            className="bg-white border-none text-black hover:bg-gray-100 flex items-center gap-2 transition-all duration-300"
          >
            Shipping Now <RightOutlined />
          </Button>

          <Button
            type="default"
            size="large"
            className="bg-gray-200 border-none text-black hover:bg-gray-300 flex items-center gap-2 transition-all duration-300"
          >
            Become a Supplier <RocketOutlined />
          </Button>
        </div>
      </div>

      {/* Optional animated globe or ship illustration */}
      
    </section>
  );
};

export default HeroSection;
