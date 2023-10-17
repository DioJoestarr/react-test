export interface AddressBase {
  name: string;
  email: string;
  phone: string;
  address: string;
  shipping_address: string;

  city: string;
  state: string;
  country: string;
}

export interface Address extends AddressBase {
  xid: string;
}
export interface AddressCreateForm extends AddressBase {
  zipcode: number;
}
export interface AddressForm extends AddressCreateForm {
  xid: string;
}
