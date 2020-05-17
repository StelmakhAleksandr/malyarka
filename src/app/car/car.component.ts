import {Component, ViewChild, AfterViewInit, AfterViewChecked, TemplateRef, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {CarService} from './car.service';
import {Car} from './car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  animations: [],
})

export class CarComponent implements AfterViewInit {
  resultsLength = 0;
  isLoadingResults = true;
  data: Array<Car>;
  editedCar: Car;
  isNewRecord: boolean;
  activeCarId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  constructor(private httpClient: HttpClient, private carService: CarService) {
  }


  loadTemplate(car: Car) {
    if (this.editedCar && this.editedCar.id === car.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  editCar(car: Car) {
    this.editedCar = new Car(car.id, car.customerId, car.title, car.number, car.color);
  }

  addCar() {
    if (!this.isNewRecord) {
      this.editedCar = new Car(0, 1, 'Название машины', '0000', '#FF00FF');
      this.data.push(this.editedCar);
      this.isNewRecord = true;
      this.setActiveCarId(this.editedCar.id);
    }
    setTimeout( () => {document.getElementById('panel-'.concat(this.editedCar.id.toString())).scrollIntoView(); }, 0 );
  }

  saveCar() {
    if (this.isNewRecord) {
      this.carService.postData(this.editedCar);
      this.isNewRecord = false;
      this.editedCar = null;
    }
    else {
      console.log('save');
      this.carService.putData(this.editedCar);
      this.editedCar = null;
      this.resultsLength = 15;
    }
    this.refresh();
  }

  cancel() {
    if (this.isNewRecord) {
      this.data.pop();
      this.isNewRecord = false;
    }
    this.editedCar = null;
  }

  setActiveCarId(id: number) {
    this.activeCarId = id;
  }

  refresh() {
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

  ngAfterViewInit() {
    // this.paginator.page.pipe(
    //   startWith({}),
    //   switchMap(() => {
    //     console.log('aaaa');
    //     this.isLoadingResults = true;
    //     return this.carService.getData(this.paginator.pageSize, this.paginator.pageIndex);
    //   }),
    //   map(data => {
    //     this.isLoadingResults = false;
    //     console.log(data);
    //     this.resultsLength = data.count;
    //     return data.items;
    //   }),
    //   catchError(() => {
    //     this.isLoadingResults = false;
    //     this.resultsLength = 0;
    //     return observableOf([]);
    //   })
    // ).subscribe(data => this.data = data);
  }

}

