import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Car, CarApi} from './car';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  url = 'http://nmcp.s-hosti.net/api/car';

  constructor(private http: HttpClient) {
  }

  getData(limit, offset): Observable<CarApi> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this.http.get<CarApi>(this.url, {params});
  }

  getOne(id: number): Observable<Car> {
    return this.http.get<Car>(this.url.concat('/').concat(id.toString()));
  }

  postData(car: Car) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url, JSON.stringify(car), {headers: myHeaders});
  }

  putData(car: Car) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const result = this.http.put(this.url, JSON.stringify(car), {headers: myHeaders});
    result.subscribe((response) => {
      console.log(response);
    });
    return result;
  }
}
