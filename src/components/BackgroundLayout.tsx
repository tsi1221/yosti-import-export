import React, { ReactNode } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex relative">
      {/* Home icon with circular background for visibility */}
      <div
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "16px",
          left: "36px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: "8px",
          borderRadius: "50%",
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <HomeOutlined style={{ color: "white", fontSize: "24px" }} />
      </div>

      {/* Left side image with welcome text */}
      <div
        className="w-1/2 hidden md:flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://th.bing.com/th/id/OIP.TQRWkqis8_oAHap81dEUvQHaEp?w=307&h=193&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3")',
        }}
      >
        {/* Transparent overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        ></div>

        {/* Welcome text */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Yosti
          </h1>
          <p className="text-white text-lg md:text-xl">
            Your gateway to seamless import-export solutions
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
