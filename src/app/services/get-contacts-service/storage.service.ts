import { Contact } from './../../models/contact';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService{
  contacts: BehaviorSubject<Array<Contact>> = new BehaviorSubject(null);

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
