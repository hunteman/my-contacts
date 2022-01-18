import { StorageService } from './../../services/get-contacts-service/storage.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [StorageService]
})
export class HeaderComponent implements OnInit {
  searchValue: string = '';
  contacts: Array<Contact> = [];
  constructor(public storageService: StorageService) { }

  ngOnInit(): void {
    // this.storageService.changeContacts(this.storageService.read('users'));
    this.contacts = this.storageService.read('users');
  }

  public contactsFilter() {
    // console.log('this.contacts: ', this.contacts);
    if(this.searchValue !== '') {
      const filteredContacts = this.contacts.filter(user => user.name.includes(this.searchValue));

      this.storageService.changeContacts(filteredContacts);
      console.log('filteredContacts: ', filteredContacts);

    } else {
      this.storageService.changeContacts(this.contacts);
    }



  }
}
