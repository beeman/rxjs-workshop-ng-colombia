import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { LayoutSidebarComponent } from './containers/layout-sidebar/layout-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ButtonComponent,
    CardComponent,
    CountryCardComponent,
    LayoutComponent,
    LayoutSidebarComponent,
  ],
  exports: [
    ButtonComponent,
    CardComponent,
    CountryCardComponent,
  ]
})
export class UiModule {
}
