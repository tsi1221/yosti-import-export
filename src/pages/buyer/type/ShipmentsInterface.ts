// src/pages/buyer/type/ShipmentsInterface.ts

export type ShipmentStatus = "booked" | "in transit" | "at port" | "customs" | "delivered";
export type ShippingMethod = "sea" | "air" | "express";

export interface ShipmentUpdate {
  update_id: string;
  shipment_id: string;
  location: string;
  status: ShipmentStatus;
  remarks: string;
  update_time: string;
}

export interface Shipment {
  shipment_id: string;
  user_id: string;
  pickup_location: string;
  destination_country: string;
  destination_city: string;
  goods_description: string;
  weight: number;
  volume: number;
  shipping_method: ShippingMethod;
  tracking_number: string;
  status: ShipmentStatus;
  estimated_delivery: string;
  updates: ShipmentUpdate[];
}
