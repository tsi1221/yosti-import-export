import { useState } from "react";
import type { SourcingRequest } from "../pages/buyer/type/Requestsinterface";

// Initial mock requests
export const initialRequests: SourcingRequest[] = [
  {
    request_id: "REQ-001",
    user_id: "USR-001",
    product_name: "T-Shirts",
    description: "Cotton t-shirts in multiple colors",
    quantity: 1000,
    target_price: 2.5,
    supplier_region: "Guangzhou",
    sample_required: true,
    deadline: "2025-12-01",
    status: "open",
    created_at: "2025-10-01T10:00:00Z",
  },
  {
    request_id: "REQ-002",
    user_id: "USR-001",
    product_name: "Electronics",
    description: "Portable Bluetooth speakers",
    quantity: 200,
    target_price: 25,
    supplier_region: "Shenzhen",
    sample_required: false,
    deadline: "2025-12-10",
    status: "quoted",
    created_at: "2025-10-05T12:30:00Z",
  },
  {
    request_id: "REQ-003",
    user_id: "USR-001",
    product_name: "Packaging Bags",
    description: "Plastic packaging bags",
    quantity: 5000,
    target_price: 0.05,
    supplier_region: "Yiwu",
    sample_required: false,
    deadline: "2025-11-30",
    status: "completed",
    created_at: "2025-09-20T09:00:00Z",
  },
];

// Hook for managing requests
export const useRequests = () => {
  const [requests, setRequests] = useState<SourcingRequest[]>(initialRequests);

  const addRequest = (newRequest: SourcingRequest) => {
    setRequests([newRequest, ...requests]);
  };

  return { requests, setRequests, addRequest };
};
