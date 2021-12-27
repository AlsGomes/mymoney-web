import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Address, PersonDTOInsert } from 'src/app/core/model/person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-editing',
  templateUrl: './person-editing.component.html',
  styleUrls: ['./person-editing.component.css']
})
export class PersonEditingComponent {
  person: PersonDTOInsert = {
    name: ''
  }

  addressStreet: string | undefined = '';
  addressNum: string | undefined = '';
  addressComplement: string | undefined = '';
  addressDistrict: string | undefined = '';
  addressCity: string | undefined = '';
  addressState: string | undefined = '';
  addressPostalCode: string | undefined = '';

  constructor(
    private service: PersonService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService
  ) { }

  async save(form: NgForm) {
    try {
      this.person.address = this.addressAssembly()
      await this.service.save(this.person)
      this.messageService.add({ severity: 'success', summary: 'Cadastro de Pessoa', detail: 'Pessoa cadastrada com sucesso' })
      form.reset();
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }

  private addressAssembly(): Address | undefined {
    this.addressStreet = this.addressStreet?.trim().length != 0 ? this.addressStreet?.trim() : undefined;
    this.addressNum = this.addressNum?.trim().length != 0 ? this.addressNum?.trim() : undefined;
    this.addressComplement = this.addressComplement?.trim().length != 0 ? this.addressComplement?.trim() : undefined;
    this.addressDistrict = this.addressDistrict?.trim().length != 0 ? this.addressDistrict?.trim() : undefined;
    this.addressCity = this.addressCity?.trim().length != 0 ? this.addressCity?.trim() : undefined;
    this.addressState = this.addressState?.trim().length != 0 ? this.addressState?.trim() : undefined;
    this.addressPostalCode = this.addressPostalCode?.trim().length != 0 ? this.addressPostalCode?.trim().replace('-', '') : undefined;

    let address: Address | undefined;
    if (this.addressStreet || this.addressNum || this.addressComplement || this.addressDistrict || this.addressCity || this.addressState || this.addressPostalCode) {
      address = {
        street: this.addressStreet,
        num: this.addressNum,
        complement: this.addressComplement,
        district: this.addressDistrict,
        city: this.addressCity,
        state: this.addressState,
        postalCode: this.addressPostalCode,
      }
    }

    return address;
  }
}