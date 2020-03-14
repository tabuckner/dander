import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CardStackComponent } from './card-stack/card-stack.component';
import { CardComponent } from './card/card.component';

export const HOME_MAT_IMPORTS = [
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ...HOME_MAT_IMPORTS,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  declarations: [
    HomePage,
    CardStackComponent,
    CardComponent
  ]
})
export class HomePageModule {}
