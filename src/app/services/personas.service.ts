import { Persona } from '../interfaces/persona';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  public personas: Persona[] = [];
  private sqlObject: SQLiteObject;
  constructor(private sqlite: SQLite, private platform: Platform) { this.openDataBase(); }
  openDataBase() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default',
      }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS personas (id TEXT PRIMARY KEY, nombre TEXT, apellido TEXT, fechaNacimiento TEXT, correo TEXT, telefono TEXT)', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
        this.sqlObject = db;
        this.gets(db);
      })
        .catch(e => console.log(e));
    })
  }
  save(persona: Persona) {
    let id = this.personas.length++;
    let data = [id, persona.nombre, persona.apellido, persona.fechaNacimiento, persona.correo, persona.telefono]
    return this.sqlObject.executeSql('INSERT INTO personas (id,nombre,apellido,fechaNacimiento,correo,telefono) VALUES (?,?,?,?,?,?)', data)
      .then(data => {
        this.gets(this.sqlObject);
      })
  }
  gets(sqlObject: SQLiteObject) {
    this.personas = [];
    return sqlObject.executeSql('SELECT * FROM personas ORDER BY nombre ASC', []).then((r) => {
      if (r.rows.length > 0) {
        for (var i = 0; i < r.rows.length; i++) {
          this.personas.push({
            id: r.rows.item(i).id,
            nombre: r.rows.item(i).nombre,
            apellido: r.rows.item(i).apellido,
            fechaNacimiento: r.rows.item(i).fechaNacimiento,
            correo: r.rows.item(i).correo,
            telefono: r.rows.item(i).telefono
          })
        }
      }
    });
  }
  edit(persona: Persona) {
    let data = [persona.id, persona.nombre, persona.apellido, persona.fechaNacimiento, persona.correo, persona.telefono];

    this.sqlObject.transaction((p) => {
      p.executeSql(`UPDATE personas SET id=?, nombre=?, apellido=?, fechaNacimiento=?, correo=?, telefono=? WHERE id=${persona.id}`, data)
    }).then(data => {
      this.gets(this.sqlObject);
    });
  }
  delete(id: string) {
    this.sqlObject.transaction((p) => {
      p.executeSql(`DELETE FROM personas WHERE id = ${id}`)
    }).then((r) => {
      this.gets(this.sqlObject);
    });
  }
}
