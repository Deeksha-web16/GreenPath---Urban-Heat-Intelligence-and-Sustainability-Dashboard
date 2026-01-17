
export type AppUser = {
  uid: string;
  email: string;
  displayName: string | null;
  password?: string; // Should not be stored long-term, only for demo
  country?: string;
  state?: string;
  city?: string;
  livingType?: "Flat" | "House" | "Ground";
};
