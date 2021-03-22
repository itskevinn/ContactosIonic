import { PersonasService } from './../../services/personas.service';
import { Persona } from '../../interfaces/persona';
import { IonicModule, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  _persona: Persona;
  fechaHoy = new Date();
  id: string
  latest_date: string;
  nombre: string
  apellido: string
  fechaNacimiento = new Date()
  correo: string
  telefono: string
  constructor(private modalController: ModalController, private personasService: PersonasService, private datepipe: DatePipe) { }

  ngOnInit() {
    this._persona = { id: '', nombre: '', apellido: '', correo: '', fechaNacimiento: null, telefono: '' }
    this.latest_date = this.datepipe.transform(this.fechaHoy, 'yyyy-MM-dd').toString();
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
  guardar() {
    this.personasService.save(this.construirPersona())
    this.dismissModal();
  }
  construirPersona() {
    this._persona.nombre = this.nombre;
    this._persona.apellido = this.apellido;
    this._persona.correo = this.correo;
    this._persona.telefono = this.telefono;
    this._persona.fechaNacimiento = this.datepipe.transform(this.fechaNacimiento, 'dd/MM/yyyy').toString();
    console.log(this._persona.fechaNacimiento);

    return this._persona;
  }
}
