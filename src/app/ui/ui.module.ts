import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './containers/layout/layout.component';
import { RouterModule } from '@angular/router';
import { LayoutSidebarComponent } from './containers/layout-sidebar/layout-sidebar.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    LayoutComponent,
    LayoutSidebarComponent,
    CardComponent,
    ButtonComponent,
  ],
  exports: [
    CardComponent,
  ]
})
export class UiModule {
}
