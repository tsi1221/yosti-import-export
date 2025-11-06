export interface User {
  user_id: number;
  full_name: string;
  company_name: string;
  country: string;
  phone: string;
  email: string;
}

export interface Supplier {
  supplier_id: number;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  verified: boolean;
}

export interface ShipmentUpdate {
  location: string;
  status: string;
  remarks?: string;
  update_time: string;
}

export interface Shipment {
  shipment_id: number;
  tracking_number: string;
  user: User;
  supplier: Supplier;
  pickup_location: string;
  destination_country: string;
  destination_city: string;
  goods_description: string;
  weight: number;
  volume: number;
  shipping_method: "sea" | "air" | "express";
  status: "booked" | "in transit" | "at port" | "customs" | "delivered";
  estimated_delivery_date: string;
  updates: ShipmentUpdate[];
}
