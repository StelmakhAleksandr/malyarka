export interface OrderStatus {
  id: number;
  title: string;
}

export interface OrderStatusApi {
  items: OrderStatus[];
  count: number;
}

export interface Order {
  id: number;
  carId: number;
  customerId: number;
  status: number;
  createDate: Date;
  description: string;
  planArrivalDate: Date;
  factArrivalDate: Date;
  planDepartureDate: Date;
  factDepartureDate: Date;
  cost: number;
  orderStatus: OrderStatus;
}

export interface OrderApi {
  items: Order[];
  count: number;
}
