export interface UserAuthData {
  token: string;
  token_type: string;
  expires_in: string;
  user: User;
}

export interface User {
  company_id: any;
  is_superadmin: number;
  lang_id: any;
  zalo_id: number;
  rank_point: number;
  user_type: string;
  is_walkin_customer: number;
  login_enabled: number;
  name: string;
  email: string;
  phone: any;
  profile_image: any;
  address: any;
  shipping_address: any;
  email_verification_code: any;
  status: string;
  reset_code: any;
  timezone: string;
  date_format: string;
  date_picker_format: string;
  time_format: string;
  tax_number: any;
  created_by: any;
  created_at: string;
  updated_at: string;
  xid: string;
  profile_image_url: string;
  x_warehouse_id: any;
}
