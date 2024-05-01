export interface BookingFilter {
  startDate: string;
  endDate: string;
  city?: string;
  maxPrice?: number;
  minBedrooms?: number;
  minBeds?: number;
  maxDistance?: number;
}
