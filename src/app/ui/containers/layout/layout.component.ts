import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  public logo = 'assets/logo.png';
  public title = 'RxJS Workshop';
  public items = [ { label: 'Demos', url: '/demos'} ];

  constructor() { }

  ngOnInit() {
  }

}
