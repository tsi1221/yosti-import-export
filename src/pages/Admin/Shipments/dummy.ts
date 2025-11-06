import type { Shipment } from "./index";

export const shipments: Shipment[] = [
  {
    shipment_id: 1,
    tracking_number: "YT20251105001",
    user: { user_id: 1, full_name: "John Doe", company_name: "JD Importers", country: "Ethiopia", phone: "+251912345678", email: "john@example.com" },
    supplier: { supplier_id: 1, name: "ABC Co", contact_person: "Li Wei", phone: "+86 123456789", email: "abc@china.com", verified: true },
    pickup_location: "Yiwu, China",
    destination_country: "Ethiopia",
    destination_city: "Addis Ababa",
    goods_description: "Coffee Beans",
    weight: 500,
    volume: 2.5,
    shipping_method: "sea",
    status: "in transit",
    estimated_delivery_date: "2025-11-15",
    updates: [
      { location: "Yiwu Warehouse", status: "booked", update_time: "2025-11-01 10:00" },
      { location: "Shanghai Port", status: "in transit", update_time: "2025-11-03 15:00" }
    ]
  },
  {
    shipment_id: 2,
    tracking_number: "YT20251105002",
    user: { user_id: 2, full_name: "Jane Li", company_name: "JL Traders", country: "Uganda", phone: "+256701234567", email: "jane@example.com" },
    supplier: { supplier_id: 2, name: "XYZ Ltd", contact_person: "Chen Ming", phone: "+86 987654321", email: "xyz@china.com", verified: true },
    pickup_location: "Guangzhou, China",
    destination_country: "Uganda",
    destination_city: "Kampala",
    goods_description: "Electronics",
    weight: 200,
    volume: 1.2,
    shipping_method: "air",
    status: "booked",
    estimated_delivery_date: "2025-11-12",
    updates: []
  }
];
