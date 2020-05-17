import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Order, OrderApi, OrderStatus, OrderStatusApi} from './order';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = 'http://nmcp.s-hosti.net/api/order';
  urlStatus = 'http://nmcp.s-hosti.net/api/status';

  constructor(private http: HttpClient) {
  }

  getStatus(order: Order): Observable<OrderStatus> {
    return this.http.get<OrderStatus>(this.urlStatus.concat('/').concat(order.status.toString()));
  }

  getStatuses(): Observable<OrderStatusApi> {
    return this.http.get<OrderStatusApi>(this.urlStatus);
  }

  getData(count, page): Observable<OrderApi> {
    const params = new HttpParams().set('limit', count).set('offset', String(page * count));
    return this.http.get<OrderApi>(this.url, {params});
  }

  postData(order: Order) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const result = this.http.post(this.url, JSON.stringify(order), {headers: myHeaders});
    result.subscribe((response) => {
      console.log(response);
    });
    return result;
  }

  putData(order: Order) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const result = this.http.put(this.url, JSON.stringify(order), {headers: myHeaders});
    result.subscribe((response) => {
      console.log(response);
    });
    return result;
  }
}
