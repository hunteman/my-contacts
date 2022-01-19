import { StorageService } from './../../services/storage.service';
import { GetContactsService } from '../../services/get-contacts.service';
import { Contact } from './../../models/contact';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [GetContactsService, StorageService]
})
export class ContactsComponent {
  @ViewChild("modalForm") modalForm: ElementRef|undefined;
  isOpen: boolean = false;
  isModalOpen: boolean = false;
  contacts: Array<Contact> = [];

  public name: string;
  public phone: string;
  public email: string;
  public id: string;


  constructor(
    public storageService: StorageService,
    private contactService: GetContactsService
    ) { }

  @HostListener('document:mousedown', ['$event'])
    onGlobalClick(event: Event): void {
      if (!this.modalForm.nativeElement.contains(event.target)) {
        this.isOpen = false;
        this.clear();
      }
  }

  ngOnInit() {
    this.contactService.getContacts().subscribe((data:any) => {
      data.forEach((user: Contact) => {
        this.contacts.push(new Contact(user.name, user.phone, user.email, user.id));
      });
      const sortedUsers = this.contacts.sort((a: any, b: any) => a.name > b.name ? 1 : -1);

      this.storageService.write('users', sortedUsers);
      this.storageService.contacts.next(this.storageService.read('users'));
    });

    this.storageService.contacts.subscribe((users) => {
      this.contacts = users;
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

  clear() {
    this.name = '';
    this.phone = '';
    this.email = '';
    this.id = '';
  }

  public modalOpen(i: any) {
    this.isOpen = true;
    this.name = this.contacts[i].name;
    this.phone = this.contacts[i].phone;
    this.email = this.contacts[i].email;
    this.id = this.contacts[i].id;
  }

  public modalClose() {
    this.isOpen = false;
    this.clear();
  }

  public saveModalData(i: any) {
    let idx = this.contacts.findIndex(c => c.id === i);

    this.storageService.write('users', this.contacts.splice(idx, 1, {name: this.name, phone: this.phone, email: this.email, id: this.id}));
    this.storageService.contacts.next(this.contacts);
    this.isOpen = false;
    this.clear();
  }

  public addContact() {
    this.isOpen = true;

    this.storageService.write('users', this.contacts.push({name: this.name, phone: this.phone, email: this.email, id: new Date().getTime().toString()}));
    this.storageService.contacts.next(this.contacts);
  }

  public contactsFilter(searchValue: any) {
    if(searchValue !== '') {
      const filteredContacts = this.storageService.read('users').filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()));

      this.storageService.changeContacts(filteredContacts);
    } else {
      this.storageService.changeContacts(this.storageService.read('users'));
    }
  }
}
