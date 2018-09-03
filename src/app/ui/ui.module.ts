import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './containers/layout/layout.component';
import { RouterModule } from '@angular/router';
import { LayoutSidebarComponent } from './containers/layout-sidebar/layout-sidebar.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { CountryCardComponent } from './components/country-card/country-card.component';

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
    CountryCardComponent,
  ],
  exports: [
    CardComponent,
    CountryCardComponent,
  ]
})
export class UiModule {
}
