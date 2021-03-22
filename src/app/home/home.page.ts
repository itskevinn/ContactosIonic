import { RegistroComponent } from './../components/registro/registro.component';
import { PersonasService } from './../services/personas.service';
import { Persona } from '../interfaces/persona';
import { EdicionComponent } from './../components/edicion/edicion.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalController: ModalController, private nativeStorage: NativeStorage, public personasService: PersonasService) { }
  persona: Persona
  async presentModal(typeModal: string, id?: string) {
    let componentName;
    if (typeModal === 'e') {
      componentName = EdicionComponent;
    }
    else {
      componentName = RegistroComponent;
    }
    const modal = await this.modalController.create({
      component: componentName,
      cssClass: 'my-custom-class'
    });
    await modal.present();
    await modal.onDidDismiss();
  }
  buscarPersona(id: string) {
    this.personasService.personas.forEach(element => {
      if (element.id == id) {
        this.persona = element
        this.guardarPersona(this.persona);
      }
    });
  }
  guardarPersona(persona: Persona) {
    this.nativeStorage.setItem('persona', { persona: persona })
      .then(
        () => console.log("Persona almacenada"),
        error => console.error('Ocurrió un error al guardar la persona en el almacenamiento', error)
      );
  }
  OnInit() {
    
  }

}
