export type BusinessTripStatus = "planned" | "ongoing" | "completed";
export type VisaInvitationStatus = "pending" | "approved" | "rejected";

export interface BusinessTrip {
  trip_id: string;
  user_id: string;
  arrival_city: string;
  arrival_date: string;
  duration_days: number;
  hotel_booking: boolean;
  transport: boolean;
  translator: boolean;
  status: BusinessTripStatus;
}

export interface VisaInvitation {
  visa_id: string;
  user_id: string;
  passport_number: string;
  nationality: string;
  planned_arrival_date: string;
  duration_days: number;
  purpose: string;
  status: VisaInvitationStatus;
}
