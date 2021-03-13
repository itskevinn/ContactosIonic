import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactos = [];
  private storag: SQLiteObject;
  constructor(private sqlite: SQLite, private platform: Platform) { this.openDataBase(); }
  openDataBase() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default',
      }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE if not exists contact (name varchar(20) primary key)', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));

        this.storag = db;
        this.get(db);
      })
        .catch(e => console.log(e));
    })
  }
  save(nombre: string) {
    let data = [nombre]
    this.storag.transaction((t) => {
      (t.executeSql(`INSERT INTO contact (name) values (?)`), data);
    })
    this.get(this.storag);
  }
  get(sqlObject: SQLiteObject) {
    this.contactos = [];
    return sqlObject.executeSql(`SELECT * FROM contact`, []).then((r) => {
      if (r.rows.length > 0) {
        for (var i = 0; i < r.rows.length; i++) {
          this.contactos.unshift(r.rows.item(i));
        }
      }
    });
  }
}
