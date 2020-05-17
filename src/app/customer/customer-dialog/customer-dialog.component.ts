import {Component, Inject, OnInit} from '@angular/core';
import {Customer} from '../customer';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {
  customerForm: FormGroup;

  customerService: CustomerService;

  constructor(
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    fb: FormBuilder, customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: Customer) {
      this.customerService = customerService;
      this.customerForm = fb.group({
        phoneControl: ['']
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  createCustomer() {
    this.data.phoneNumber = this.customerForm.get('phoneControl').value;
    this.customerService.postData(this.data).subscribe(response => {
      this.dialogRef.close(response);
    });
  }

}
