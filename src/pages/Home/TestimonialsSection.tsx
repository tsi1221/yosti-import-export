import React, { useState } from "react";
import { Rate } from "antd";

const testimonials = [
  {
    name: "Dawit G.",
    country: "Ethiopia",
    rating: 5,
    text: "Yosti helped me source high-quality machinery at a much better price than I expected. They handled everything, including the visa, hotel, and factory tour. I highly recommend their team!",
  },
  {
    name: "Samuel K.",
    country: "South Sudan",
    rating: 5,
    text: "Thanks to Yosti’s business trip planning, I visited reliable suppliers in Yiwu and finalized deals quickly. They even provided a translator and helped me negotiate lower prices.",
  },
  {
    name: "Mulu B.",
    country: "Ethiopia",
    rating: 5,
    text: "I’ve used other sourcing agents before, but Yosti is the only one that provided full transparency, video inspections, and timely updates. Their logistics support was also excellent.",
  },
];

const InfiniteTestimonials: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <h2 className="text-3xl md:text-4xl text-center mb-12 font-bold">
          What Our <span className="text-[#0F3952]">Clients</span> Say?
        </h2>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className={`flex gap-8 ${isPaused ? "paused" : "animate-scroll"}`}
          >
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg p-6 text-[#0F3952] hover:scale-105 transition-transform"
              >
                <div className="flex items-center mb-4">
                  <Rate disabled defaultValue={t.rating} className="text-yellow-400" />
                </div>
                <p className="text-sm mb-4">{`"${t.text}"`}</p>
                <p className="font-semibold text-yellow-400">{t.name}, {t.country}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-scroll {
          display: flex;
          gap: 2rem;
          animation: scroll 20s linear infinite;
        }
        .paused {
          display: flex;
          gap: 2rem;
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default InfiniteTestimonials;
