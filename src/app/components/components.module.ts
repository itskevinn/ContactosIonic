import { EdicionComponent } from './edicion/edicion.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RegistroComponent } from './registro/registro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [HeaderComponent, RegistroComponent, EdicionComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [RegistroComponent, HeaderComponent, EdicionComponent]
})
export class ComponentsModule { }
