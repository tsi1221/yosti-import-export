import { useState } from "react";
import type { BusinessTrip, VisaInvitation } from "../pages/buyer/type/TripsInterface";
import { message } from "antd";
import dayjs from "dayjs";

const initialBusinessTrips: BusinessTrip[] = [
  {
    trip_id: "TRP-001",
    user_id: "USR-001",
    arrival_city: "Addis Ababa",
    arrival_date: "2025-12-10",
    duration_days: 5,
    hotel_booking: true,
    transport: true,
    translator: false,
    status: "planned",
  },
  {
    trip_id: "TRP-002",
    user_id: "USR-001",
    arrival_city: "Nairobi",
    arrival_date: "2025-11-20",
    duration_days: 3,
    hotel_booking: false,
    transport: true,
    translator: true,
    status: "ongoing",
  },
];

const initialVisaInvitations: VisaInvitation[] = [
  {
    visa_id: "VISA-001",
    user_id: "USR-001",
    passport_number: "P123456789",
    nationality: "Ethiopian",
    planned_arrival_date: "2025-12-10",
    duration_days: 5,
    purpose: "Business Meeting",
    status: "pending",
  },
  {
    visa_id: "VISA-002",
    user_id: "USR-001",
    passport_number: "P987654321",
    nationality: "Ethiopian",
    planned_arrival_date: "2025-11-20",
    duration_days: 3,
    purpose: "Conference",
    status: "approved",
  },
];

export const useTrips = () => {
  const [businessTrips, setBusinessTrips] = useState<BusinessTrip[]>(initialBusinessTrips);
  const [visaInvitations, setVisaInvitations] = useState<VisaInvitation[]>(initialVisaInvitations);

  const addBusinessTrip = (trip: Omit<BusinessTrip, "trip_id" | "user_id" | "status">) => {
    const newTrip: BusinessTrip = {
      ...trip,
      trip_id: `TRP-${(businessTrips.length + 1).toString().padStart(3, "0")}`,
      user_id: "USR-001",
      status: "planned",
    };
    setBusinessTrips([newTrip, ...businessTrips]);
    message.success("Business Trip requested successfully!");
  };

  const addVisaInvitation = (visa: Omit<VisaInvitation, "visa_id" | "user_id" | "status">) => {
    const newVisa: VisaInvitation = {
      ...visa,
      visa_id: `VISA-${(visaInvitations.length + 1).toString().padStart(3, "0")}`,
      user_id: "USR-001",
      status: "pending",
    };
    setVisaInvitations([newVisa, ...visaInvitations]);
    message.success("Visa Invitation requested successfully!");
  };

  return {
    businessTrips,
    visaInvitations,
    addBusinessTrip,
    addVisaInvitation,
  };
};
