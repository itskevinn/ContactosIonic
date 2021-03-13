import { ContactsService } from './../../services/contacts.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  nombre: string = "";
  constructor(private modalController: ModalController, private contactsSevice: ContactsService) { }

  ngOnInit() { }
  dismissModal() {
    this.modalController.dismiss();
  }
  cambiarNombre(event) {
    this.nombre = event.detail.value
  }
  guardar() {
    this.contactsSevice.save(this.nombre)
  }
}
