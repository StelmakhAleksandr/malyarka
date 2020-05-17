import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer, CustomerApi} from './customer';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = 'http://nmcp.s-hosti.net/api/customer';

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getData(limit, offset): Observable<CustomerApi> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this.http.get<CustomerApi>(this.url, {params});
  }

  getOne(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.url.concat('/').concat(id.toString()));
  }

  postData(customer: Customer) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const result = this.http.post(this.url, JSON.stringify(customer), {headers: myHeaders});
    return result;
  }

}
