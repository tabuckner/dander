import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CardStackComponent } from './card-stack/card-stack.component';
import { CardComponent } from './card/card.component';
import { CardDetailsComponent } from './card-details/card-details.component';

export const HOME_MAT_IMPORTS = [
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule
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
    CardComponent,
    CardDetailsComponent
  ],
  entryComponents: [
    CardDetailsComponent,
  ]
})
export class HomePageModule {}
