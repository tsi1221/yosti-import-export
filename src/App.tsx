// App.tsx
import React from "react";
import {  Routes, Route } from "react-router-dom";

import Navbar from "./pages/Home/Navbar";
import HeroSection from "./pages/Home/HeroSection";
import AboutSection from "./pages/Home/AboutSection";
import ServicesSection from "./pages/Home/ServicesSection";
import ExportProductsSection from "./pages/Home/ExportProductsSection";
import BlogSection from "./pages/Home/BlogSection";
import TestimonialsSection from "./pages/Home/TestimonialsSection";
import ContactSection from "./pages/Home/ContactSection";
import Footer from "./pages/Home/Footer";

// // Example individual blog pages
// import BlogNews from "./pages/Home/BlogNews";
// import BlogInsights from "./pages/Home/BlogInsights";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex-1">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <ExportProductsSection />
                <ServicesSection />
                <TestimonialsSection />
                
              </>
            }
          />

          {/* Other Pages */}
          <Route path="/about" element={<AboutSection />} />
          {/* <Route path="/services" element={<ServicesSection />} /> */}
          <Route path="/blog" element={<BlogSection />} />
          {/* <Route path="/blog/news" element={<BlogNews />} />
          <Route path="/blog/insights" element={<BlogInsights />} /> */}
          <Route path="/exports/coffee" element={<ExportProductsSection />} />
          <Route path="/exports/spices" element={<ExportProductsSection />} />
          <Route path="/exports/oilseeds" element={<ExportProductsSection />} />
          <Route path="/testimonials" element={<TestimonialsSection />} />
          <Route path="/contact" element={<ContactSection />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
