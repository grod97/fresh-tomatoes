import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesPagePageRoutingModule } from './movies-page-routing.module';

import { MoviesPagePage } from './movies-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviesPagePageRoutingModule
  ],
  declarations: [MoviesPagePage]
})
export class MoviesPagePageModule {}
