import { useState, useEffect } from "react";
import type { DashboardData } from "../pages/buyer/type/Dashboardinterface";

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 500));

      const mockData: DashboardData = {
        stats: [
          { title: "Active Requests", value: 4, color: "#FFC727" },
          { title: "Pending Quotes", value: 2, color: "#FF9F1C" },
          { title: "Shipments In Transit", value: 1, color: "#0D6EFD" },
        ],
        requests: [
          { item: "Electronics", status: "Pending Quote", color: "text-blue-700" },
          { item: "Furniture", status: "Under Review", color: "text-yellow-600" },
          { item: "Fashion Items", status: "Quoted", color: "text-green-700" },
        ],
        shipments: [
          { id: "CN-001", status: "In Transit", color: "text-blue-700" },
          { id: "CN-002", status: "Delivered", color: "text-green-700" },
        ],
      };

      setData(mockData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { data, loading };
};
