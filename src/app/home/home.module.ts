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
import { CardStackComponent } from './card-stack/card-stack.component';
import { CardComponent } from './card/card.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardSkeletonComponent } from './card-skeleton/card-skeleton.component';
import { ImageModalComponent } from './image-modal/image-modal.component';

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
    ...HOME_MAT_IMPORTS,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  declarations: [
    HomePage,
    CardStackComponent,
    CardComponent,
    CardDetailsComponent,
    CardSkeletonComponent,
    ImageModalComponent,
  ],
  entryComponents: [
    CardDetailsComponent,
    ImageModalComponent,
  ]
})
export class HomePageModule {}
