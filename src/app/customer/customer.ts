export interface Customer {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
}

export interface CustomerApi {
  items: Customer[];
  count: number;
}
