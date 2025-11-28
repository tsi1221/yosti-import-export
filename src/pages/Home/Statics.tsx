import type { ReactNode } from "react";
import { OrderedListOutlined, ShopOutlined, TruckOutlined, UserOutlined } from "@ant-design/icons";

// Single statistics card
type StaticsCardProps = {
  icon: ReactNode;
  name: string;
  num: number;
};

function StaticsCard({ icon, name, num }: StaticsCardProps) {
  return (
    <div className="bg-white w-60 h-28 relative rounded-md shadow-md flex flex-col items-center justify-center pt-10">
      {/* Icon container */}
      <div className="bg-[#0F3952] text-yellow-400 w-16 h-16 flex items-center justify-center text-3xl rounded-full absolute -top-8">
        {icon}
      </div>

      {/* Stats content */}
      <div className="flex items-center gap-3 mt-4">
        <p className="text-[#0F3952] text-3xl font-bold">{num}</p>
        <p className="uppercase text-[#0F3952] font-medium">{name}</p>
      </div>
    </div>
  );
}

// Data for cards
const staticsData = [
  { icon: <OrderedListOutlined />, name: "Orders Processed", num: 124 },
  { icon: <UserOutlined />, name: "Total Customers", num: 879 },
  { icon: <TruckOutlined />, name: "Active Shipments", num: 312 },
  { icon: <ShopOutlined />, name: "Total Suppliers", num: 56 },
];

// Container component for all stats
function Statics() {
  return (
    <div className="bg-black w-full py-16 flex justify-center items-center">
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4 sm:px-6 lg:px-8 items-center">
        {staticsData.map((statics, index) => (
          <div key={index} className="w-full sm:w-auto">
            <StaticsCard
              icon={statics.icon}
              name={statics.name}
              num={statics.num}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statics;
