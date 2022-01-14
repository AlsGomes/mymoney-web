import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactDTOInsert } from 'src/app/core/model/person';

@Component({
  selector: 'app-person-contacts',
  templateUrl: './person-contacts.component.html',
  styleUrls: ['./person-contacts.component.css']
})
export class PersonContactsComponent {

  showingContactModal: boolean = false;

  @Input() personContacts: ContactDTOInsert[] = [];

  newContactInfo: ContactDTOInsert = {
    name: '',
    email: '',
    telephone: ''
  };

  contactIndex: number = -1
  constructor() { }

  get updatingContact() {
    return this.contactIndex != -1
  }

  showContactModal(form: NgForm) {
    this.setDefaultNewContactInfo();
    this.contactIndex = -1
    this.showingContactModal = true
    form.reset()
  }

  updateContact(contact: any, index: number, form: NgForm) {
    this.showContactModal(form);

    this.newContactInfo.name = contact.name;
    this.newContactInfo.email = contact.email;
    this.newContactInfo.telephone = contact.telephone;

    this.contactIndex = index
  }

  saveNewContact(form: NgForm) {
    if (this.contactIndex === -1) {
      this.personContacts.push(this.newContactInfo);
    } else {
      this.personContacts[this.contactIndex] = this.newContactInfo
    }

    this.contactIndex = -1
    this.showingContactModal = false
    this.setDefaultNewContactInfo()
    form.reset();
  }

  removeContact(index: number) {
    this.personContacts.splice(index, 1)
  }

  private setDefaultNewContactInfo() {
    this.newContactInfo = {
      name: '',
      email: '',
      telephone: ''
    }
  }
}
