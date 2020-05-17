import {Component, ViewChild, AfterViewInit, TemplateRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';
import {OrderService} from './order.service';
import {Order, OrderStatus} from './order';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Customer} from '../customer/customer';
import {CustomerService} from '../customer/customer.service';
import {Ng2SearchPipe} from 'ng2-search-filter';
import {MatDialog} from '@angular/material/dialog';
import {CustomerDialogComponent} from '../customer/customer-dialog/customer-dialog.component';
import {Car} from '../car/car';
import {CarDialogComponent} from '../car/car-dialog/car-dialog.component';
import {CarService} from '../car/car.service';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return {'invalidAutocompleteObject': {value: control.value}};
    }
    return null;
  };
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [Ng2SearchPipe],
  animations: [],
})

export class OrderComponent implements AfterViewInit {
  resultsLength = 0;
  isLoadingResults = true;
  data: Array<Order>;
  editedOrder: Order;
  isNewRecord: boolean;
  activeOrderId: number;

  customerOptions: Array<Customer>;
  customerControl = new FormControl('', {validators: [autocompleteObjectValidator(), Validators.required]});
  customerFilteredOptions: Observable<Customer[]>;

  carOptions: Array<Car>;
  carControl = new FormControl('', {validators: [autocompleteObjectValidator(), Validators.required]});
  carFilteredOptions: Observable<Car[]>;

  statuses: Array<OrderStatus>;

  public validationMessages = {
    'customerControl': [
      {type: 'invalidAutocompleteObject', message: 'Выберите клиента из списка'},
      {type: 'required', message: 'Клиент обязательное поле'}
    ],
    'carControl': [
      {type: 'invalidAutocompleteObject', message: 'Выберите машину из списка'},
      {type: 'required', message: 'Машина обязательное поле'}
    ]

  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  constructor(private orderService: OrderService, private customerService: CustomerService,
              private searchPipe: Ng2SearchPipe, fb: FormBuilder, public dialog: MatDialog,
              private carService: CarService) {
    this.loadCustomerOptions();
    this.loadCarOptions();
    this.loadStatuses();
  }

  loadCustomerOptions() {
    this.customerService.getData(0, 0).subscribe(response => {
      this.customerOptions = response.items;
    });
  }

  loadCarOptions() {
    this.carService.getData(0, 0).subscribe(response => {
      this.carOptions = response.items;
    });
  }

  loadStatuses() {
    this.orderService.getStatuses().subscribe(response => {
      this.statuses = response.items;
    });
  }

  // statusToNumber() {
  //   this.editedOrder.status =
  // }

  openCustomerDialog(): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '250px',
      data: {id: 0, name: '', surname: '', phoneNumber: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.id) {
        return;
      }
      this.customerService.getOne(result.id).subscribe(response => {
        this.customerOptions.push(response);
        this.customerControl.setValue(response);
      });
    });
  }

  openCarDialog(): void {
    const dialogRef = this.dialog.open(CarDialogComponent, {
      width: '250px',
      data: {id: 0, title: '', number: '', color: '', customerId: 2}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (!result || !result.id) {
        return;
      }
      this.carService.getOne(result.id).subscribe(response => {
        this.carOptions.push(response);
        this.carControl.setValue(response);
      });
    });
  }

  customerDisplay(customer: Customer): string {
    return customer ? customer.name + ' ' + customer.surname : '';
  }

  carDisplay(car: Car): string {
    return car ? car.title : '';
  }

  ngAfterViewInit() {
    this.customerFilteredOptions = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value?.name),
      map(term => term ? this.searchPipe.transform(this.customerOptions, term) : this.customerOptions.slice())
    );

    this.carFilteredOptions = this.carControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value?.name),
      map(term => term ? this.searchPipe.transform(this.carOptions, term) : this.carOptions.slice())
    );

    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.orderService.getData(this.paginator.pageSize, this.paginator.pageIndex);
      }),
      tap(data => {
        data.items.forEach(order => {
          order.planArrivalDate = new Date(order.planArrivalDate);
          order.createDate = new Date(order.createDate);
          order.planDepartureDate = new Date(order.planDepartureDate);
          order.factArrivalDate = new Date(order.factArrivalDate);
          order.factDepartureDate = new Date(order.factDepartureDate);
          this.orderService.getStatus(order).subscribe(response => order.orderStatus = response);
        });
      }),
      map(data => {
        this.isLoadingResults = false;
        this.resultsLength = data.count;
        return data.items;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.resultsLength = 0;
        return observableOf([]);
      })
    ).subscribe(data => this.data = data);
  }

  loadTemplate(order: Order) {
    if (this.editedOrder && this.editedOrder.id === order.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  editOrder(order: Order) {
    // this.editedOrder = JSON.parse(JSON.stringify(order));
    this.editedOrder = Object.assign({}, order);
  }

  addOrder() {
    if (!this.isNewRecord) {
      this.editedOrder = {
        id: 0,
        carId: 1,
        customerId: 1,
        status: 1,
        createDate: null,
        description: '',
        planArrivalDate: null,
        factArrivalDate: null,
        planDepartureDate: null,
        factDepartureDate: null,
        cost: 0,
        orderStatus: null
      };
      this.data.push(this.editedOrder);
      this.isNewRecord = true;
    }
    this.setActiveOrderId(this.editedOrder.id);
    setTimeout(() => {
      document.getElementById('panel-'.concat(this.editedOrder.id.toString())).scrollIntoView();
    }, 0);
  }

  saveOrder() {
    if (this.customerControl.status !== 'VALID') {
      return;
    }
    if (this.carControl.status !== 'VALID') {
      return;
    }
    this.editedOrder.customerId = this.customerControl.value.id;
    this.editedOrder.carId = this.carControl.value.id;
    console.log(this.editedOrder);
    // if (this.isNewRecord) {
    //   this.orderService.postData(this.editedOrder);
    //   this.isNewRecord = false;
    // } else {
    //   this.orderService.putData(this.editedOrder);
    // }
    // this.editedOrder = null;
    // this.refresh();
  }

  cancel() {
    if (this.isNewRecord) {
      this.data.pop();
      this.isNewRecord = false;
    }
    this.editedOrder = null;
  }

  setActiveOrderId(id: number) {
    this.activeOrderId = id;
  }

  refresh() {
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

}

