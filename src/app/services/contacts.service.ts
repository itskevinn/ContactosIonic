import { Contacto } from './../interfaces/contacto';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  public contactos = [];
  private sqlObject: SQLiteObject;
  constructor(private sqlite: SQLite, private platform: Platform) { this.openDataBase(); }
  openDataBase() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default',
      }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS contact (id TEXT PRIMARY KEY, nombre TEXT, numeros TEXT)', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
        this.sqlObject = db;
        this.get(db);
      })
        .catch(e => console.log(e));
    })
  }
  save(contacto: Contacto) {
    let id = this.contactos.length++;
    let data = [id, contacto.nombre, JSON.stringify(contacto.numeros)]
    return this.sqlObject.executeSql('INSERT INTO contact (id,nombre,numeros) VALUES (?,?,?)', data).then(data => {
      this.get(this.sqlObject);
    })
  }
  get(sqlObject: SQLiteObject) {
    this.contactos = [];
    return sqlObject.executeSql('SELECT * FROM contact', []).then((r) => {
      if (r.rows.length > 0) {
        for (var i = 0; i < r.rows.length; i++) {
          let numeros = []
          if (r.rows.item(i).numeros != '') {
            numeros = JSON.parse(r.rows.item(i).numeros);
          }
          this.contactos.push({
            id: r.rows.item(i).id,
            numeros: numeros,
            nombre: r.rows.item(i).nombre
          })
        }
      }
    });
  }
}
