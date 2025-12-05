// src/pages/buyer/QuotesInterface.ts
export interface QuoteReply {
  sender: "buyer" | "supplier";
  message: string;
  created_at: string;
}

export interface SupplierQuote {
  quote_id: string;
  request_id: string;
  supplier_name: string;
  price: number;
  moq: number;
  lead_time: string;
  notes: string;
  created_at: string;
  replies?: QuoteReply[];
}
