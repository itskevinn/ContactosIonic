import { RegistroComponent } from './../compontents/registro/registro.component';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalController: ModalController) { }
  async presentModal() {
    const modal = await this.modalController.create({
      component: RegistroComponent,
      cssClass: 'my-custom-class'
    });
    await modal.present();
    await modal.onDidDismiss();
  }

}
