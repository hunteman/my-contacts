import { StorageService } from './../../services/get-contacts-service/storage.service';
import { GetContactsService } from '../../services/get-contacts-service/get-contacts.service';
import { Contact } from './../../models/contact';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contacts-item',
  templateUrl: './contacts-item.component.html',
  styleUrls: ['./contacts-item.component.scss'],
  providers: [GetContactsService, StorageService]
})
export class ContactsItemComponent implements OnInit {
  @Output() userReadAndChange = new EventEmitter();

  isModalOpen: boolean = false;
  contacts: Array<Contact> = [];
  constructor(
    public storageService: StorageService,
    private contactService: GetContactsService
    ) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe((data:any) => {
      data.forEach((user: Contact) => {
        this.contacts.push(new Contact(user.name, user.phone, user.email, user.id));
      });
      const sortedUsers = this.contacts.sort((a: any, b: any) => a.name > b.name ? 1 : -1);

      if(this.storageService.read('users') === null) {
        this.storageService.write('users', sortedUsers);
      }
      this.storageService.contacts.next(this.storageService.read('users'));
      console.log('this.storageService.read ', this.storageService.read('users'));
      console.log('this.storageService.contacts: ', this.storageService.contacts);
      this.contacts = this.storageService.contacts.getValue();
    });  

  }

  public isHasDifferentPrevFirstLetter(i: number, firstLetter: string) {
    if(this.contacts[i-1]) {
      if(firstLetter !== this.contacts[i-1].name.charAt(0)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  public modalOpen(i) {
    this.isModalOpen = true;
    this.userReadAndChange.emit(i);
  }
}
