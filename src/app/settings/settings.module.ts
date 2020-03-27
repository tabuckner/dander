import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FavoritesPage } from './favorites/favorites.page';

export const SETTINGS_MAT_IMPORTS = [
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    ExploreContainerComponentModule,
    ...SETTINGS_MAT_IMPORTS,
  ],
  declarations: [
    SettingsPage,
    FavoritesPage
  ]
})
export class SettingsPageModule { }
