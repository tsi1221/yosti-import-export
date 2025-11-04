import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import about from "../../assets/about.png";

const AboutSection: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-gray-50" id="about">
      {/* Heading */}
      <div className="text-center mb-6 -mt-8">
        {loading ? (
          <Skeleton.Input active size="small" className="w-32 h-6 mx-auto" />
        ) : (
          <>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
              About Us
            </h2>
            <div className="mt-2 w-16 h-1 bg-[#0021f5b4] mx-auto rounded-full"></div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          {loading ? (
            <div className="space-y-2">
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          ) : (
            <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 -ml-6">
              Yosti Import & Export connects Africa and China, simplifying global
              trade with transparent sourcing, verification, shipping, and
              inspection services — empowering importers and exporters to build
              trust, ensure quality, and collaborate confidently through seamless,
              efficient trade solutions.
            </p>
          )}

          {!loading && (
            <a
              href="/about"
              className="inline-block mt-1 text-[#0021f5b4] hover:text-[#001ac4] font-medium text-sm transition-colors"
            >
              Learn More →
            </a>
          )}
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          {loading ? (
            <Skeleton.Image active className="w-3/6 h-48 rounded-lg" />
          ) : (
            <img
              src={about}
              alt="About Yosti Import & Export"
              className="w-1/2 md:w-4/6 h-auto rounded-xl shadow-md object-cover hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
