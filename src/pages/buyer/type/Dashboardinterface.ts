// src/pages/buyer/DashboardInterface.ts

export interface StatCard {
  title: string
  value: number | string
  color: string
}

export interface RequestItem {
  item: string
  status: string
  color: string
}

export interface ShipmentItem {
  id: string
  status: string
  color: string
}

export interface DashboardData {
  stats: StatCard[]
  requests: RequestItem[]
  shipments: ShipmentItem[]
}
