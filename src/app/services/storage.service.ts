import { Contact } from 'src/app/models/contact';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService{
  contacts = new Subject<Array<Contact>>();

  public changeContacts(users: Array<Contact>) {
    this.contacts.next(users); 
 }

  public remove(key: string) {
    window.localStorage.removeItem(key);
  }

  public write(key: string, value: Array<Contact>) {
    window.localStorage.setItem(key, JSON.stringify(value));
    this.changeContacts(value);
  }

  public read(key: string) {
    const data = window.localStorage.getItem(key);
    if(data) {
      const dataParse = JSON.parse(data);
      this.changeContacts(dataParse);
      return dataParse;
    }
  }

  public clear() {
    localStorage.clear();
  }

}
