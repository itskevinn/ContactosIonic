import { CompontentsModule } from './../compontents/compontents.module';
import { HeaderComponent } from './../compontents/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CompontentsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
