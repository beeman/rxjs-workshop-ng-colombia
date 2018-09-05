import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrismModule } from '@ngx-prism/core';

import { ActivityComponent } from './components/activity/activity.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { CodeStepsComponent } from './components/code-steps/code-steps.component';
import { CodeComponent } from './components/code/code.component';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PersonCardComponent } from './components/person-card/person-card.component';
import { ResultComponent } from './components/result/result.component';
import { LayoutSidebarComponent } from './containers/layout-sidebar/layout-sidebar.component';
import { LayoutComponent } from './containers/layout/layout.component';

@NgModule({
  imports: [CommonModule, PrismModule, RouterModule],
  declarations: [
    ActivityComponent,
    ButtonComponent,
    CardComponent,
    CodeComponent,
    CodeStepsComponent,
    CountryCardComponent,
    LayoutComponent,
    LayoutSidebarComponent,
    LoaderComponent,
    PersonCardComponent,
    ResultComponent,
  ],
  exports: [
    ActivityComponent,
    ButtonComponent,
    CardComponent,
    CodeComponent,
    CodeStepsComponent,
    CountryCardComponent,
    LoaderComponent,
    PersonCardComponent,
    ResultComponent,
  ],
})
export class UiModule {}
