import React from "react";
import { Rate, Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const testimonials = [
  {
    name: "Abel K.",
    country: "🇪🇹",
    rating: 5,
    text: "Yosti made my first import from China smooth and transparent.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Li Wei",
    country: "🇨🇳",
    rating: 5,
    text: "Excellent service and reliable supplier verification!",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Grace M.",
    country: "🇺🇬",
    rating: 4,
    text: "Fast logistics support and very helpful customer care.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Samuel T.",
    country: "🇸🇸",
    rating: 5,
    text: "Professional and responsive service for international trade.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Mei L.",
    country: "🇨🇳",
    rating: 4,
    text: "Smooth process and great supplier network.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const TestimonialsSection: React.FC = () => {
  const carouselRef = React.useRef<any>(null);

  return (
    <section className="py-16 bg-gray-50" id="testimonials">
      <div className="container mx-auto px-6 md:px-12 relative">
        <h2 className="text-3xl md:text-4xl text-black text-center mb-10 font-medium">
          What Our Clients Say
        </h2>

        {/* Left Arrow */}
        <button
          onClick={() => carouselRef.current.prev()}
          className="absolute left-0 top-1/2 transform  -ml-15 -translate-y-1/2 z-10 text-blue-500 text-2xl bg-white rounded-full p-3 shadow-lg hover:bg-gray-100"
        >
          <LeftOutlined />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => carouselRef.current.next()}
          className="absolute right-0 top-1/2 transform -mr-15 -translate-y-1/2 z-10 text-blue-500 text-2xl bg-white rounded-full p-3 shadow-lg hover:bg-gray-100"
        >
          <RightOutlined />
        </button>

        <Carousel
          ref={carouselRef}
          slidesToShow={3}
          slidesToScroll={1}
          infinite
          dots={false}
          className="overflow-visible"
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
          ]}
        >
          {testimonials.map((t, index) => (
            <div key={index} className="px-14 flex justify-center">
              <div className="flex flex-col items-center text-center transition-transform transform hover:scale-105">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-700 italic mb-4">{`"${t.text}"`}</p>
                <Rate disabled defaultValue={t.rating} className="mb-2" />
                <p className="text-black">
                  {t.name}, {t.country}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
