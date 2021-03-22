import { DatePipe } from '@angular/common';
import { PersonasService } from './../../services/personas.service';
import { LoadingController, ModalController, ViewWillEnter } from '@ionic/angular';
import { Persona } from '../../interfaces/persona';
import { Component, OnInit, Input } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.scss'],
})
export class EdicionComponent implements ViewWillEnter, OnInit {
  persona: any;
  fechaHoy = new Date();
  id: string
  latest_date: string;
  nombre: string
  apellido: string
  fechaNacimiento = new Date();
  correo: string
  telefono: string
  constructor(private datepipe: DatePipe, private modalController: ModalController, private nativeStorage: NativeStorage,
    public personasService: PersonasService, private datePipe: DatePipe) { }
  ngOnInit() {
    this.latest_date = this.datepipe.transform(this.fechaHoy, 'yyyy-MM-dd').toString();
  }
  ionViewWillEnter() {
    this.nativeStorage.getItem('persona')
      .then(
        data => this.recuperarPersona(data),
        error => console.error(error)
      );
  }

  recuperarPersona(persona?: any) {
    this.persona = persona.persona
    this.mapearDatos(this.persona)
    if (this.persona) {
      return true
    }
    return false;
  }
  mapearDatos(persona: Persona) {
    this.nombre = persona.nombre
    this.apellido = persona.apellido
    this.correo = persona.correo
    this.telefono = persona.telefono
  }
  dismissModal() {
    this.modalController.dismiss();
  }
  cambiarFechaNacimiento(event) {
    this.fechaNacimiento = event.detail.value
  }
  cambiarNombre(event) {
    this.nombre = event.detail.value
  }
  cambiarApellido(event) {
    this.apellido = event.detail.value
  }
  cambiarTelefono(event) {
    this.telefono = event.detail.value
  }
  cambiarCorreo(event) {
    this.correo = event.detail.value
  }
  editar() {
    this.personasService.edit(this.construirPersona())
    this.dismissModal();
  }
  eliminar(id: string) {
    this.personasService.delete(id);
    this.dismissModal();
  }
  construirPersona() {
    this.persona.nombre = this.nombre;
    this.persona.apellido = this.apellido;
    this.persona.correo = this.correo;
    this.persona.telefono = this.telefono;
    this.persona.fechaNacimiento = this.datePipe.transform(this.fechaNacimiento, 'dd/MM/yyyy').toString();
    return this.persona;
  }

}
