<<<<<<< HEAD
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import type { Role } from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import SourcingDashboard from './pages/Admin/Sourcing/SourcingDashboard';
import Header from './components/Header';
import Support from './pages/Admin/Support/Support';

// Define the fixed width of the sidebar
const SIDEBAR_WIDTH = 'w-64'; // 16rem
const HEADER_HEIGHT = 'h-16'; // Assuming your header is 4rem (h-16) tall

const App: React.FC = () => {
  const [role, setRole] = useState<Role>('customer'); // centralized role state

  return (
    // Main container uses relative positioning for context
    <div className="relative min-h-screen bg-gray-50">
      
      {/* 1. Sidebar (Fixed on the left) */}
      {/* Takes up 16rem of width, fixed position, full height. z-index: 40 to ensure it overlaps the header at the seam. */}
      <div className={`fixed top-0 left-0 bottom-0 ${SIDEBAR_WIDTH} flex-shrink-0 z-40`}>
        <Sidebar role={role} />
      </div>

      {/* 2. Header (Fixed on top, NEXT TO the sidebar) */}
      {/* - fixed top-0: Fixes it to the top.
        - left-64: Starts exactly where the w-64 Sidebar ends (16rem).
        - w-[calc(100%-16rem)]: Ensures it only takes up the remaining screen width.
        - z-30: Sidebar is z-40, so this sits visually below the sidebar at the edge.
      */}
      <div className={`fixed top-0 left-64 w-[calc(100%-16rem)] ${HEADER_HEIGHT} flex-shrink-0 bg-white shadow-sm z-30`}>
        <Header role={role} setRole={setRole}  />

      </div>


     
      <div className={`ml-64 pt-16 flex flex-col min-h-screen`}>
        
        {/* Page content */}
        <div className="flex-1 p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sourcing" element={<SourcingDashboard />} />
            <Route path="/support" element={<Support />} />

            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
=======
# import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./pages/Home/Navbar";
import Footer from "./pages/Home/Footer";
import HeroSection from "./pages/Home/HeroSection";
import AboutSection from "./pages/Home/AboutSection";
import ServicesSection from "./pages/Home/ServicesSection";
import ExportProductsSection from "./pages/Home/ExportProductsSection";
// import BlogSection from "./pages/Home/BlogSection";
import TestimonialsSection from "./pages/Home/TestimonialsSection";
import ContactSection from "./pages/Home/ContactSection";
import Blog from "./pages/Home/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App: React.FC = () => {
  const location = useLocation();

  // Pages without Navbar/Footer
  const noLayoutPages = ["/login", "/register"];
  const hideLayout = noLayoutPages.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

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
          {/* <Route path="/blog" element={<BlogSection />} /> */}
          <Route path="/exports/coffee" element={<ExportProductsSection />} />
          <Route path="/exports/spices" element={<ExportProductsSection />} />
          <Route path="/exports/oilseeds" element={<ExportProductsSection />} />
          <Route path="/testimonials" element={<TestimonialsSection />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="blog/news" element={<Blog />} />
          <Route path="/blog/insights" element={<Blog />} />
          {/* Login/Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;

>>>>>>> 4a1e96c26f7f2c49f99e5570f0cd90f946a928ce
