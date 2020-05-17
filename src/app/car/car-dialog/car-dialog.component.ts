import {Component, Inject, OnInit} from '@angular/core';
import {CarService} from '../car.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CustomerDialogComponent} from '../../customer/customer-dialog/customer-dialog.component';
import {Car} from '../car';

// @ts-ignore
@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.css']
})
export class CarDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car, private carService: CarService) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  saveCar() {
    console.log(this.data);
    this.carService.postData(this.data).subscribe(response => {
      this.dialogRef.close(response);
    });
  }

  ngOnInit(): void {
  }

}
