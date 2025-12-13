import  type  { ReactNode } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import yostiLogo from "../assets/yostilogo.png";

interface AuthLayoutProps {
  children: ReactNode;
  showLeftPanel?: boolean; // optional prop to show/hide left panel
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, showLeftPanel = true }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex relative">
      {/* Home Icon */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-4 left-9 bg-white/20 p-2 rounded-full cursor-pointer z-50"
      >
        <HomeOutlined style={{ color: "#FACC15", fontSize: "24px" }} />
      </div>

      {/* Left Panel */}
      {showLeftPanel && (
        <div className="w-1/2 hidden md:flex flex-col items-center justify-center bg-[#0F3952] relative">
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="relative z-1 flex flex-col items-center justify-center px-6 text-center">
            <img src={yostiLogo} alt="Yosti Logo" className="w-32 h-32 mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Welcome to Yosti
            </h1>
            <p className="text-white text-lg md:text-xl">
              Your gateway to seamless import-export solutions
            </p>
          </div>
        </div>
      )}

      {/* Right Panel - Form */}
      <div
        className={`w-full ${showLeftPanel ? "md:w-8/12" : "w-full"} flex items-center justify-center p-6`}
      >
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
