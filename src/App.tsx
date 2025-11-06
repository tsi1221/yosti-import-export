import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Admin pages
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import SourcingDashboard from "./pages/Admin/Sourcing/SourcingDashboard";
// import Support from "./pages/Admin/Support/Support";
import type { Role } from "./components/Sidebar";

// Public pages
import Navbar from "./pages/Home/Navbar";
import Footer from "./pages/Home/Footer";
import HeroSection from "./pages/Home/HeroSection";
import AboutSection from "./pages/Home/AboutSection";
import ServicesSection from "./pages/Home/ServicesSection";
import ExportProductsSection from "./pages/Home/ExportProductsSection";
import TestimonialsSection from "./pages/Home/TestimonialsSection";
import ContactSection from "./pages/Home/ContactSection";
import Blog from "./pages/Home/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Statics from "./pages/Home/Statics";
import AdminShipmentPage from "./pages/Admin/Shipments/AdminShipmentPage";
import SupportTable from "./pages/Admin/Support/SupportTable";

const SIDEBAR_WIDTH = "w-64";
const HEADER_HEIGHT = "h-16";

const App: React.FC = () => {
  const location = useLocation();
  const [role, setRole] = useState<Role>("customer");

  // Determine layout type
  const adminRoutes = ["/dashboard", "/sourcing", "/support"];
  const isAdminPage = adminRoutes.includes(location.pathname);

  const noLayoutPages = ["/login", "/register"];
  const hidePublicLayout = noLayoutPages.includes(location.pathname);

  return (
    <>
      {isAdminPage && (
        <>
          {/* Admin Sidebar */}
          <div className={`fixed top-0 left-0 bottom-0 ${SIDEBAR_WIDTH} z-40`}>
            <Sidebar role={role} />
          </div>

          {/* Admin Header */}
          <div
            className={`fixed top-0 left-64 w-[calc(100%-16rem)] ${HEADER_HEIGHT} bg-white shadow-sm z-30`}
          >
            <Header role={role} setRole={setRole} />
          </div>

          {/* Admin Page Content */}
          <div className={`ml-64 pt-16 min-h-screen`}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sourcing" element={<SourcingDashboard />} />
              <Route path="/support" element={<SupportTable/>} />
            </Routes>
          </div>
        </>
      )}

      {!isAdminPage && !hidePublicLayout && <Navbar />}

      {!isAdminPage && (
        <div className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <ExportProductsSection />
                  <ServicesSection />
                  <Statics/>
                  <TestimonialsSection />
                </>
              }
            />
            <Route path="/about" element={<AboutSection />} />
             <Route path="/at" element={<AdminShipmentPage/>} />
            
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
      )}

      {!isAdminPage && !hidePublicLayout && <Footer />}
    </>
  );
};

export default App;
