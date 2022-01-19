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

  public write(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public read(key: string) {
    const i = window.localStorage.getItem(key);
    return i ? JSON.parse(i) : null;
  }

  public clear() {
    localStorage.clear();
  }

}
