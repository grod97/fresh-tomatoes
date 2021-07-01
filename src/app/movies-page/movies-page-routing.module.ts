import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesPagePage } from './movies-page.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesPagePageRoutingModule {}
