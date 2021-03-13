import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  sqlObject: SQLiteObject;
  constructor(private sqlite: SQLite) { }
  createDB() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('create table if not exists contact(name VARCHAR(32))', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
        this.sqlObject = db;
      })
      .catch(e => console.log(e));
  }
  save(nombre: string) {
    let data = [nombre]
    this.sqlObject.transaction((t) => {
      (t.executeSql(`INSERT INTO contact (name, telefono) values (?)`), data);
    })
  }
}
