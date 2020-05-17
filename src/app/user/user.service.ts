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
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJcdTIwMThpZFx1MjAxOSI6MSwiXHUyMDE4bmFtZVx1MjAxOSI6InNhc2hhIn0.YKcYllZ2QB_7SfTKRgK4YADFFyMCrZV1_dyLbL_noK8\n'
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
