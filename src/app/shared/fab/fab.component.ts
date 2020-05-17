import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.css']
})
export class FabComponent implements OnInit {
  @Input()
  actionFunction: () => void;

  @Input()
  iconName: string;

  constructor() { }

  ngOnInit(): void {
  }
}
