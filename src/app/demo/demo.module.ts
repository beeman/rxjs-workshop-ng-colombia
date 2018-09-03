import { NgModule } from '@angular/core';

import { AppSharedModule } from '../app-shared.module';

import { DemoRoutingModule } from './demo-routing.module';

import { Demo1Component } from './components/demo1/demo1.component';
import { Demo2Component } from './components/demo2/demo2.component';
import { Demo3Component } from './components/demo3/demo3.component';
import { Demo4Component } from './components/demo4/demo4.component';
import { Demo5Component } from './components/demo5/demo5.component';
import { Demo6Component } from './components/demo6/demo6.component';
import { Demo7Component } from './components/demo7/demo7.component';
import { Demo8Component } from './components/demo8/demo8.component';
import { Demo9Component } from './components/demo9/demo9.component';
import { Demo0Component } from './components/demo0/demo0.component';

@NgModule({
  imports: [
    AppSharedModule,
    DemoRoutingModule
  ],
  declarations: [
    Demo1Component,
    Demo2Component,
    Demo3Component,
    Demo4Component,
    Demo5Component,
    Demo6Component,
    Demo7Component,
    Demo8Component,
    Demo9Component,
    Demo0Component,
  ]
})
export class DemoModule {
}
