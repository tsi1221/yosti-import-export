export type InspectionType = "sample" | "pre-shipment" | "factory visit";

export interface Inspection {
  inspection_id: string;
  user_id: string;
  product_type: string;
  inspection_type: InspectionType;
  date: string;
  photo_video_files: string[]; // Use this array to track if Photo/Video is required
  report_url?: string;
  created_at: string;
}
