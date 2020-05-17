import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CustomerComponent} from './customer/customer.component';
import {OrderComponent} from './order/order.component';
import {CarComponent} from './car/car.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {BrowserModule} from '@angular/platform-browser';
import {PhoneMaskDirective} from './phone-mask.directive';
import {CustomerDialogComponent} from './customer/customer-dialog/customer-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {TokenInterceptor} from './user/token.interceptor';
import {AuthComponent} from './user/auth/auth.component';
import { CarDialogComponent } from './car/car-dialog/car-dialog.component';


const appRoutes: Routes = [
  {path: 'customer', component: CustomerComponent},
  {path: 'order', component: OrderComponent},
  {path: 'car', component: CarComponent},
  {path: 'user', component: AuthComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    OrderComponent,
    CarComponent,
    PhoneMaskDirective,
    CustomerDialogComponent,
    AuthComponent,
    CarDialogComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes),
    MatCardModule, MatButtonModule, MatExpansionModule, MatToolbarModule,
    MatMenuModule, MatPaginatorModule, MatGridListModule, MatTableModule,
    MatProgressSpinnerModule, MatSortModule, MatInputModule, MatIconModule,
    MatDatepickerModule, MatNativeDateModule, MatSelectModule,
    NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule,
    HttpClientModule,
    BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule,
    Ng2SearchPipeModule, MatDialogModule,
  ],
  providers: [MatDatepickerModule, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
