import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements AfterViewInit {
  panelOpenState = false;
  response: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) {

    this.http.get('http://localhost:8888/customer')
      .subscribe((response) => {
        this.response = response;
        console.log(this.response);
      });
  }


  ngAfterViewInit(): void {
    console.log(this.paginator.page);
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        console.log('zaebis');
        return observableOf([]);
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        console.log('zaebis is loading');
        return observableOf([]);
      }),
      catchError(() => {
        return observableOf([]);
      })
    );
  }

  pzdc() {
    console.log(this.paginator.page);
  }

}
