import { Contacto } from './../../interfaces/contacto';
import { ContactsService } from './../../services/contacts.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  contacto: Contacto;
  nombre: string = "";
  numero1: string;
  numero2: string;
  numeros = []
  constructor(private modalController: ModalController, private contactsSevice: ContactsService) { }

  ngOnInit() {
    this.contacto = { id: '', nombre: '', numeros: [] }
  }
  dismissModal() {
    this.modalController.dismiss();
  }
  cambiarNombre(event) {
    this.nombre = event.detail.value
    console.log(this.nombre);
  }
  cambiarNumero1(event) {
    this.numero1 = event.detail.value;
  }
  cambiarNumero2(event) {
    this.numero2 = event.detail.value;
  }
  guardar() {
    this.contactsSevice.save(this.construirContacto())
    this.dismissModal();
  }
  construirContacto() {
    this.contacto.nombre = this.nombre;
    this.numeros.push(this.numero1);
    this.numeros.push(this.numero2);
    this.contacto.numeros = this.numeros;
    return this.contacto;
  }
}
