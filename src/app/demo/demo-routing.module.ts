import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutSidebarComponent } from '../ui/containers/layout-sidebar/layout-sidebar.component';
import { Demo0Component } from './components/demo0/demo0.component';
import { Demo1Component } from './components/demo1/demo1.component';
import { Demo2Component } from './components/demo2/demo2.component';
import { Demo3Component } from './components/demo3/demo3.component';
import { Demo4Component } from './components/demo4/demo4.component';
// import { Demo6Component } from './components/demo6/demo6.component';
import { Demo5Component } from './components/demo5/demo5.component';
import { Demo7Component } from './components/demo7/demo7.component';
import { Demo8Component } from './components/demo8/demo8.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutSidebarComponent,
    data: {
      links: [
        { label: 'Introduction', url: 'introduction' },
        { label: 'Handling events', url: 'handling-events' },
        { label: 'Transform streams', url: 'transform-streams' },
        { label: 'Draw on a canvas', url: 'draw-canvas' },
        { label: 'Network Request', url: 'network-request' },
        { label: 'Text Input', url: 'text-input' },
        // { label: '', url: 'demo6' },
        { label: 'Creating Observables', url: 'creating-observables' },
        { label: 'Subjects', url: 'subjects' },
        // { label: 'Extra Exercises 2', url: 'extra-exercises-2' },
      ],
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'introduction' },
      { path: 'introduction', component: Demo0Component },
      { path: 'handling-events', component: Demo1Component },
      { path: 'transform-streams', component: Demo2Component },
      { path: 'draw-canvas', component: Demo3Component },
      { path: 'network-request', component: Demo4Component },
      { path: 'text-input', component: Demo5Component },
      // { path: 'demo6', component: Demo6Component },
      { path: 'creating-observables', component: Demo7Component },
      { path: 'subjects', component: Demo8Component },
      // { path: 'extra-exercises-2', component: Demo9Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
