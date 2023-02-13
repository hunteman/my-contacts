import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from './../../models/contact';

@Component({
  selector: 'app-contacts-item',
  templateUrl: './contacts-item.component.html',
  styleUrls: ['./contacts-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactsItemComponent {
  @Input () contactName: string;
}
