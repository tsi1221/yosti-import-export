// src/hooks/useQuotes.ts
import { useState } from "react";
import type { SupplierQuote } from "../pages/buyer/type/QuotesInterface";
// import dayjs from "dayjs";

const initialQuotes: SupplierQuote[] = [
  {
    quote_id: "Q-001",
    request_id: "REQ-001",
    supplier_name: "Supplier A",
    price: 2.6,
    moq: 500,
    lead_time: "15 days",
    notes: "Includes shipping to Ethiopia",
    created_at: "2025-10-02T12:00:00Z",
    replies: [
      { sender: "supplier", message: "Includes shipping to Ethiopia", created_at: "2025-10-02T12:00:00Z" },
    ],
  },
  {
    quote_id: "Q-002",
    request_id: "REQ-001",
    supplier_name: "Supplier B",
    price: 2.5,
    moq: 1000,
    lead_time: "20 days",
    notes: "Samples available",
    created_at: "2025-10-03T08:30:00Z",
    replies: [
      { sender: "supplier", message: "Samples available", created_at: "2025-10-03T08:30:00Z" },
    ],
  },
  {
    quote_id: "Q-003",
    request_id: "REQ-002",
    supplier_name: "Supplier C",
    price: 24.5,
    moq: 50,
    lead_time: "10 days",
    notes: "High quality Bluetooth speakers",
    created_at: "2025-10-06T10:15:00Z",
    replies: [
      { sender: "supplier", message: "High quality Bluetooth speakers", created_at: "2025-10-06T10:15:00Z" },
    ],
  },
];

export const useQuotes = () => {
  const [quotes, setQuotes] = useState<SupplierQuote[]>(initialQuotes);

  const addReply = (quote_id: string, message: string) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.quote_id === quote_id
          ? {
              ...q,
              replies: [
                ...(q.replies || []),
                { sender: "buyer", message, created_at: new Date().toISOString() },
              ],
            }
          : q
      )
    );
  };

  return { quotes, addReply };
};
