import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutSidebarComponent } from '../ui/containers/layout-sidebar/layout-sidebar.component';

import { Demo1Component } from './components/demo1/demo1.component';
import { Demo2Component } from './components/demo2/demo2.component';
import { Demo3Component } from './components/demo3/demo3.component';
import { Demo4Component } from './components/demo4/demo4.component';
import { Demo5Component } from './components/demo5/demo5.component';
import { Demo6Component } from './components/demo6/demo6.component';
import { Demo7Component } from './components/demo7/demo7.component';
import { Demo8Component } from './components/demo8/demo8.component';
import { Demo9Component } from './components/demo9/demo9.component';

const routes: Routes = [{
  path: '',
  component: LayoutSidebarComponent,
  data: {
    links: [
      { label: '1. Handling events', url: 'handling-events' },
      { label: '2. Counting clicks', url: 'counting-clicks' },
      { label: '3. Draw on a canvas', url: 'draw-canvas' },
      { label: '4. Network Request', url: 'network-request' },
      { label: '5. Text Input', url: 'text-input' },
      { label: '6. Auto complete', url: 'auto-complete' },
      { label: '7. Creating Observables', url: 'creating-observables' },
      { label: '8. Subjects', url: 'subjects' },
      { label: '9. Extra Exercises 2', url: 'extra-exercises-2' },
    ],
  },
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'handling-events' },
    { path: 'handling-events', component: Demo1Component },
    { path: 'counting-clicks', component: Demo2Component },
    { path: 'draw-canvas', component: Demo3Component },
    { path: 'network-request', component: Demo4Component },
    { path: 'text-input', component: Demo5Component },
    { path: 'auto-complete', component: Demo6Component },
    { path: 'creating-observables', component: Demo7Component },
    { path: 'subjects', component: Demo8Component },
    { path: 'extra-exercises-2', component: Demo9Component },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
