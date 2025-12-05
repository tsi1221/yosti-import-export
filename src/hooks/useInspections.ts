import { useState } from "react";
import type { Inspection } from "../pages/buyer/type/InspectionsInterface";

const initialInspections: Inspection[] = [
  {
    inspection_id: "INS-001",
    user_id: "USR-001",
    product_type: "Bluetooth Speaker",
    inspection_type: "pre-shipment",
    date: "2025-11-20",
    photo_video_files: ["required"],
    report_url: "",
    created_at: "2025-11-10",
  },
  {
    inspection_id: "INS-002",
    user_id: "USR-001",
    product_type: "Packaging Bags",
    inspection_type: "sample",
    date: "2025-11-22",
    photo_video_files: [],
    report_url: "",
    created_at: "2025-11-12",
  },
];

export const useInspections = () => {
  const [inspections, setInspections] = useState<Inspection[]>(initialInspections);

  const addInspection = (newInspection: Inspection) => {
    setInspections((prev) => [newInspection, ...prev]);
  };

  return { inspections, addInspection };
};
