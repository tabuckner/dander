import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import { FavoritesPage } from './favorites/favorites.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    children: [
    ]
  },
  {
    path: 'favorites',
    component: FavoritesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule { }
