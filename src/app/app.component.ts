import { Component } from '@angular/core';

interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public navLinks: NavLink[] = [
    {label: 'Заказы', path: '/order'},
    {label: 'Клиенты', path: '/customer'}
  ]
}
