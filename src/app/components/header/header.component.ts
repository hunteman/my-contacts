import { StorageService } from './../../services/storage.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [StorageService]
})

export class HeaderComponent implements OnInit {
  @Output() onChanged = new EventEmitter<string>();
  searchValue: string = '';
  contacts: Array<Contact> = [];

  constructor(public storageService: StorageService) { }

  ngOnInit(): void {
    this.contacts = this.storageService.read('users');
  }

  public search() {
    this.onChanged.emit(this.searchValue);
  }
}
