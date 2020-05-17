import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  username: string;
  pass: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.username);
    console.log(this.pass);
  }



}
