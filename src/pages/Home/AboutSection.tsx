import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import aboutImg from "../../assets/about.png";

const AboutSection: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="min-h-[80vh] flex flex-col justify-center -mt-14 bg-gray-50 py-2 md:py-24"
      id="about"
    >
      {/* Heading */}
      <div className="text-center mb-12">
        {loading ? (
          <Skeleton.Input active size="small" className="w-32 h-6 mx-auto" />
        ) : (
          <>
            <h2 className="text-lg sm:text-2xl md:text-3xl mb-3 font-semibold text-gray-900 tracking-tight">
              About Us
            </h2>
            <div className="w-20 h-0.5 bg-[#0021f5b4] mx-auto rounded-full"></div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-2 md:px-6 flex flex-col lg:flex-row items-center gap-4 lg:gap-20">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          {loading ? (
            <div className="space-y-3">
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          ) : (
            <div
              className="animate-fadeIn"
              style={{ animation: "fadeIn 0.8s ease-in-out" }}
            >
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-1 px-0 md:px-0">
                Yosti Import & Export connects Africa and China, simplifying global
                trade with transparent sourcing, verification, shipping, and
                inspection services —  <br /> empowering importers and exporters to build {""}
                trust, ensure quality, and collaborate confidently through seamless,
                efficient trade solutions. <br /> <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam,
              </p>
              <a
                href="/about"
                className="inline-block mt-4 text-[#0021f5b4] hover:text-[#001ac4] font-medium text-sm transition-colors"
              >
                Learn More →
              </a>
            </div>
          )}
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img src={aboutImg} className="w-full h-82 border-r-2 rounded-lg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
