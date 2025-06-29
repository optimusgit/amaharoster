export interface Provider {
  id: number;
  name: string;
  image: string;
  provider_usertype: string;
  is_inhouse: boolean;
  service_type: string;
  clinic_details: {
    id: number;
    name: string;
  };
  availabilities: {
    online_slots: string[];
    offline_slots: string[];
    both_slots: string[];
    online_booked_slots: string[];
    offline_booked_slots: string[];
    blocked_slots: {
      slot: string;
      reason: string;
    }[];
  }[];
}
