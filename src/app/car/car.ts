export class Car {
  constructor(
    public id: number,
    public customerId: number,
    public title: string,
    public number: string,
    public color: string,) {
  }
}


export interface CarApi {
  items: Car[];
  count: number;
}
