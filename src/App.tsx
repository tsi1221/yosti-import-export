// src/App.tsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import type { Role } from "./components/Sidebar";

// ===== DASHBOARD PAGES =====
// Admin
import AdminDashboard from "./pages/Admin/Dashboard";
import SourcingDashboard from "./pages/Admin/Sourcing";
import SupportTable from "./pages/Admin/Support";
import Inspections from "./pages/Admin/Inspections";
import AdminProfile from "./pages/Admin/Profile";
import Payments from "./pages/Admin/Payments";
import Blogs from "./pages/Admin/Blogs";

// Logistics
import LogisticsDashboard from "./pages/logistics/Dashboard";
import LogisticsShipments from "./pages/logistics/AllShipments";
import LogisticsBooking from "./pages/logistics/NewBooking";
import LogisticsCoordination from "./pages/logistics/Coordination";
import LogisticsProfile from "./pages/logistics/Profile";
import UploadDocs from "./pages/logistics/UploadDocs";
import EstimatedDelivery from "./pages/logistics/EstimatedDelivery";

// Student
import StudentDashboard from "./pages/Students/Dashboard";
import StudentCommunication from "./pages/Students/Communication";
import StudentProfile from "./pages/Students/Profile";

// Buyer
import BuyerDashboard from "./pages/buyer/MyRequests";
import Requests from "./pages/buyer/MyRequests";

import Trips from "./pages/buyer/MyTrips";
import MyShipments from "./pages/buyer/MyShipments";
import MyPayments from "./pages/buyer/MyPayments";
import Support from "./pages/buyer/Support";

// Supplier
import OpenRequests from "./pages/Supplier/OpenRequests";
import MyQuotes from "./pages/Supplier/MyQuotes";
import MyInspections from "./pages/Supplier/MyInspections";
import VerificationStatus from "./pages/Supplier/VerificationStatus";

// Super-admin
import SuperDashboard from "./pages/superadmin/Dashboard";
import SupplierQuotes from "./pages/superadmin/SupplierQuotes";
import Suppliers from "./pages/superadmin/Suppliers";
import BusinessTrips from "./pages/superadmin/BusinessTrips";
import VisaInvitations from "./pages/superadmin/VisaInvitations";
import SupportTickets from "./pages/superadmin/SupportTickets";
import Users from "./pages/superadmin/Users";
import StaffManagement from "./pages/superadmin/StaffManagement";
import Settings from "./pages/superadmin/Settings";

// Public Pages
import Navbar from "./pages/Home/Navbar";
import Footer from "./pages/Home/Footer";
import HeroSection from "./pages/Home/HeroSection";
import AboutSection from "./pages/Home/AboutSection";
import ExportProductsSection from "./pages/Home/ExportProductsSection";
import ServicesSection from "./pages/Home/ServicesSection";
import TestimonialsSection from "./pages/Home/TestimonialsSection";
import ContactSection from "./pages/Home/ContactSection";
import Statics from "./pages/Home/Statics";
import Blog from "./pages/Home/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shipments from "./pages/Admin/Shipments";
import Dashboard from "./pages/buyer/Dashboard";
import Quotes from "./pages/buyer/MyQuotes";
import BlogCard from "./pages/Home/BlogCard";
import ProductPage from "./pages/product/product";
import DashboardSupplier from "./pages/Supplier/Dashboard";
import SupplierProfile from "./pages/Supplier/Profile";
import MyInspectionsBuyer from "./pages/buyer/MyInspections";
import BuyerProfile from "./pages/buyer/Profile";
import SourcingRequests from "./pages/superadmin/SourcingRequests";
import SuperAdminQuotes from "./pages/superadmin/SupplierQuotes";
import AllSuppliers from "./pages/superadmin/Suppliers";
import AllShipments from "./pages/superadmin/Shipments";
import AllInspections from "./pages/superadmin/Inspections";
import AllVisaInvitations from "./pages/superadmin/VisaInvitations";
import AllPayments from "./pages/superadmin/Payments";
import AllExportProducts from "./pages/superadmin/ExportProducts";
import AllBlog from "./pages/superadmin/Blog";
import AllTestimonials from "./pages/superadmin/Testimonials";
import AllUsers from "./pages/superadmin/Users";
import WhyChoose from "./pages/Home/Whychoose";
import OURPROJECT from "./pages/Home/Ourproject";
import TwoFA from "./pages/TwoFA";
import ForgotPassword from "./pages/ForgotPassword";
import Productt from "./pages/Home/product";
// import Productt  from "./pages/Home/productt";

const SIDEBAR_WIDTH = "w-64";
const HEADER_HEIGHT = "h-16";

const App: React.FC = () => {
  const location = useLocation();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role") as Role | null;
    if (savedRole) setRole(savedRole);
  }, []);

  // Role-based dashboard routes
  const dashboardRoutes: Record<Role, string[]> = {
    admin: ["/admin/dashboard","/blogs","/sourcing","/support","/shipments","/inspections","/payments","/profile"],
    buyer: ["/buyer/dashboard","/requests","/quotes","/buyerinspection","/blog/news","/trips","/shipments","/payments","/support","/buyerprofile"],
    supplier: ["/supplier/dashboard","/open-requests","/my-quotes","/my-inspections","/verification-status","/SupplierProfile"],
    logistics: ["/logistics/dashboard","/shipments","/new-booking","/upload-docs","/estimated-delivery","/coordination","/profile"],
    student: ["/student/dashboard","/communication","/profile"],
    "super-admin": ["/superadmin/dashboard","/allsourcing","/alltestimonials","/allinspections","/allusers","/allquotes","/allsuppliers","/alltrips","/allvisa","/all-support-tickets","/allusers","/allblogs","/staff-management","/allshipments","/allpayments","/all-port-Products","/settings"]
  };

  const isDashboardRoute = role && dashboardRoutes[role]?.includes(location.pathname);
  const hidePublicLayout = ["/login","/register"].includes(location.pathname);

  return (
    <>
      {/* Dashboard Layout */}
      {isDashboardRoute && role && (
        <>
          <div className={`fixed top-0 left-0 bottom-0 ${SIDEBAR_WIDTH} bg-white border-r z-40`}>
            <Sidebar role={role} />
          </div>

          <div className={`fixed top-0 left-64 w-[calc(100%-16rem)] ${HEADER_HEIGHT} bg-white shadow-sm z-30`}>
            <Header role={role} setRole={setRole} />
          </div>

          <div className="ml-64 pt-16 min-h-screen bg-gray-50">
            <Routes>
              {/* Admin */}
              {role === "admin" && (
                <>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/sourcing" element={<SourcingDashboard />} />
                  <Route path="/support" element={<SupportTable />} />
                  <Route path="/shipments" element={<Shipments/>} />
                  <Route path="/inspections" element={<Inspections />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="/profile" element={<AdminProfile />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </>
              )}

              {/* Buyer */}
              {role === "buyer" && (
                <>
                  <Route path="/buyer/dashboard" element={<Dashboard/>} />
                  <Route path="/requests" element={<Requests/>} />
                  <Route path="/quotes" element={<Quotes/>} />
                  <Route path="/trips" element={<Trips />} />
                  <Route path="/shipments" element={<MyShipments />} />
                  <Route path="/payments" element={<MyPayments />} />
                  <Route path="/support" element={<Support />} />
                 <Route path="/buyerinspection" element={<MyInspectionsBuyer/>} /> 
                <Route path="/blog/news" element={<Blog />} />
                <Route path="/products" element={<ProductPage/>} />
                  <Route path="/buyerprofile" element={<BuyerProfile/>} />
                  <Route path="*" element={<Navigate to="/buyer/dashboard" replace />} />
                </>
              )}

              {/* Supplier */}
              {role === "supplier" && (
                <>
                  <Route path="/supplier/dashboard" element={<DashboardSupplier/>} />
                  <Route path="/open-requests" element={<OpenRequests />} />
                  <Route path="/my-quotes" element={<MyQuotes />} />
                  <Route path="/my-inspections" element={<MyInspections />} />
                  <Route path="/verification-status" element={<VerificationStatus />} />
                  <Route path="/SupplierProfile" element={<SupplierProfile/>} />
                  <Route path="*" element={<Navigate to="/supplier/dashboard" replace />} />
                </>
              )}

              {/* Logistics */}
              {role === "logistics" && (
                <>
                  <Route path="/logistics/dashboard" element={<LogisticsDashboard />} />
                  <Route path="/shipmentsorder" element={<LogisticsShipments />} />
                  <Route path="/new-booking" element={<LogisticsBooking />} />
                  <Route path="/upload-docs" element={<UploadDocs />} />
                  <Route path="/estimated-delivery" element={<EstimatedDelivery />} />
                  <Route path="/coordination" element={<LogisticsCoordination />} />
                  <Route path="/profile" element={<LogisticsProfile />} />
                  <Route path="*" element={<Navigate to="/logistics/dashboard" replace />} />
                </>
              )}

              {/* Student */}
              {role === "student" && (
                <>
                  <Route path="/student/dashboard" element={<StudentDashboard />} />
                  <Route path="/communication" element={<StudentCommunication />} />
                  <Route path="/profile" element={<StudentProfile />} />
                  <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
                </>
              )}

              {/* Super-admin */}
              {role === "super-admin" && (
                <>
                  <Route path="/superadmin/dashboard" element={<SuperDashboard />} />
                  <Route path="/allsourcing" element={<SourcingRequests/>} />
                  <Route path="/allquotes" element={<SuperAdminQuotes/>} />
                  <Route path="/allsuppliers" element={<AllSuppliers/>} />
                  <Route path="/business-trips" element={<BusinessTrips />} />
                  <Route path="/allvisa" element={<AllVisaInvitations/>} />
                  <Route path="/all-support-tickets" element={<SupportTickets />} />
                  <Route path="/all-users" element={<Users />} />
                   <Route path="/staff-management" element={<StaffManagement />} />
                  <Route path="/allshipments" element={<AllShipments/>} />
                   <Route path="/allinspections" element={<AllInspections/>} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/alltrips" element={<BusinessTrips/>} />
                  <Route path="/all-port-Products" element={<AllExportProducts/>} />
                  <Route path="/allblogs" element={< AllBlog/>} />
                  <Route path="/allpayments" element={<AllPayments/>} />    
                  <Route path="/alltestimonials" element={<AllTestimonials/>} />
                   <Route path="/allusers" element={<AllUsers/>} />
               
                  
                 
                  <Route path="*" element={<Navigate to="/superadmin/dashboard" replace />} />
                </>
              )}
            </Routes>
          </div>
        </>
      )}

      {/* Public Layout */}
      {!isDashboardRoute && !hidePublicLayout && <Navbar />}

      {!isDashboardRoute && (
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <ExportProductsSection />
                  <ServicesSection /> {/* Public services page on home */}
                  <Statics />
                  <TestimonialsSection />
                </>
              }
            />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/whychoose" element={<WhyChoose/>} />
            <Route path="/services" element={<ServicesSection />} /> {/* Public page */}
            <Route path="/exports/coffee" element={<ExportProductsSection />} />
            <Route path="/exports/spices" element={<ExportProductsSection />} />
            <Route path="/Ourproject" element={<OURPROJECT/>} />
            <Route path="/projectt" element={<Productt />} />
            <Route path="/exports/oilseeds" element={<ExportProductsSection />} />
            <Route path="/testimonials" element={<TestimonialsSection />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/2fa" element={<TwoFA />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/blog/news" element={<Blog />} />
            <Route path="/products" element={<ProductPage/>} />
            <Route path="/login" element={<Login setRole={setRole} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      )}

      {!isDashboardRoute && !hidePublicLayout && <Footer />}
    </>
  );
};

export default App;
