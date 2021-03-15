import { Contacto } from './../../interfaces/contacto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.scss'],
})
export class EdicionComponent implements OnInit {
  @Input() contacto: Contacto = null;
  constructor() { }

  ngOnInit() {
    console.log(this.contacto.id);
    console.log(this.contacto.nombre);
  }

}
