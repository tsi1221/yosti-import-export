import { OrderedListOutlined, ShopOutlined, TruckOutlined, UserOutlined } from "@ant-design/icons";
import StaticsCard from "./StaticsCard";

const staticsData = [
  { icon: <OrderedListOutlined />, name: "Orders Processed", num: 124 },
  { icon: <UserOutlined />, name: "Total Customers", num: 879 },
  { icon: <TruckOutlined />, name: "Active Shipments", num: 312 },
  { icon: <ShopOutlined />, name: "Total Suppliers", num: 56 },
];

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
