import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserApi} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://nmcp.s-hosti.net/api/customer';

  user: UserApi;

  constructor(private http: HttpClient) {
    this.user = {
      user: {id: 1, name: 'sasha'},
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJcdTIwMThpZFx1MjAxOSI6MX0.q2xLICgWkqp8yV1nE-L3KL_gv3zrKOO3GMSAHqhbc7A\n'
    };
  }

  getHeader() {
    return new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(this.user.token)
    });
  }

  getToken() {
    return this.user.token;
  }
}
