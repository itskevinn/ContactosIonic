import { Contacto } from './../interfaces/contacto';
import { EdicionComponent } from './../components/edicion/edicion.component';
import { ContactsService } from './../services/contacts.service';
import { RegistroComponent } from './../compontents/registro/registro.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalController: ModalController, public contactsService: ContactsService) { }
  async presentModal(typeModal: string, contacto?: Contacto) {
    let componentName;
    if (typeModal === 'e') {
      componentName = EdicionComponent;
    }
    else {
      componentName = RegistroComponent;
    }
    const modal = await this.modalController.create({
      component: componentName,
      componentProps: {
        contacto: contacto
      },
      cssClass: 'my-custom-class'
    });

    await modal.present();
    await modal.onDidDismiss();
    console.log(this.contactsService.contactos);
  }
  OnInit() {
    console.log(this.contactsService.contactos);
  }
}
