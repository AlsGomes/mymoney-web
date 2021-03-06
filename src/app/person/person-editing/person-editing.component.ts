import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Address, CitySummary, ContactDTOInsert, PersonDTOInsert, StateSummary } from 'src/app/core/model/person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-editing',
  templateUrl: './person-editing.component.html',
  styleUrls: ['./person-editing.component.css']
})
export class PersonEditingComponent implements OnInit {

  person: PersonDTOInsert = {
    name: ''
  }

  personContacts: ContactDTOInsert[] = [];

  states: any[] = [];
  cities: any[] = [];

  addressStreet: string | undefined = '';
  addressNum: string | undefined = '';
  addressComplement: string | undefined = '';
  addressDistrict: string | undefined = '';
  addressPostalCode: string | undefined = '';

  selectedStateId: number | undefined;
  selectedCityId: number | undefined;

  editingCode: string | undefined;

  constructor(
    private service: PersonService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
    private title: Title,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fecthStates();
    this.editingCode = this.route.snapshot.params['code']

    if (this.editingCode) {
      this.fetchPerson(this.editingCode);
    } else {
      this.updateTitle()
    }
  }

  async fetchAddress() {
    const isValidCep = this.addressPostalCode?.match('[0-9]{5}-[0-9]{3}') != null
    if (!isValidCep)
      return

    const addressViaCep = await this.service.fetchAddressByCEP(this.addressPostalCode!)
    if (!addressViaCep)
      return;

    const res: any = { ...addressViaCep }
    if (res.erro) {
      return
    }

    const cityByIBGE = await this.service.fetchCityByIBGE(Number.parseInt(addressViaCep.ibge!));
    this.selectedStateId = cityByIBGE.state.id;
    this.fetchCities();
    this.selectedCityId = cityByIBGE.id;

    this.addressStreet = addressViaCep.logradouro
    this.addressDistrict = addressViaCep.bairro
    this.addressComplement = addressViaCep.complemento
  }

  async fecthStates() {
    const res = await this.service.fetchStates();
    this.states = res.map((state: StateSummary) => ({ label: state.name, value: state.id }));
  }

  async fetchCities() {
    if (!this.selectedStateId)
      return

    const res = await this.service.fetchCities(this.selectedStateId);
    this.cities = res.map((city: CitySummary) => ({ label: city.name, value: city.id }));
  }

  async fetchPerson(code: string) {
    const res = await this.service.fetchByCode(code);

    if (res.userDetail) {
      this.errorHandler.handle(res.userDetail)
    } else {
      this.updateLocalPersonWith(res);
      this.updateTitle()
    }
  }

  async save(form: NgForm) {
    if (this.editingCode) {
      this.update()
    } else {
      this.saveNew()
    }
  }

  async saveNew() {
    try {
      this.person.address = this.addressAssembly()
      this.person.contacts = this.personContacts
      const res = await this.service.save(this.person)
      this.messageService.add({ severity: 'success', summary: 'Cadastro de Pessoa', detail: 'Pessoa cadastrada com sucesso' })
      this.router.navigate(['/persons/editing/', res.code])
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }

  async update() {
    try {
      this.person.address = this.addressAssembly()
      this.person.contacts = this.personContacts
      const res = await this.service.update(this.person, this.editingCode!)
      this.messageService.add({ severity: 'success', summary: 'Edi????o de Pessoa', detail: 'Pessoa editada com sucesso' })
      this.updateLocalPersonWith(res)
      this.updateTitle()
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
    this.addressPostalCode = this.addressPostalCode?.trim().length != 0 ? this.addressPostalCode?.trim().replace('-', '') : undefined;

    let address: Address | undefined;
    if (this.addressStreet || this.addressNum || this.addressComplement || this.addressDistrict || this.selectedCityId || this.addressPostalCode) {
      address = {
        street: this.addressStreet,
        num: this.addressNum,
        complement: this.addressComplement,
        district: this.addressDistrict,
        city: this.selectedCityId ? { id: this.selectedCityId } : undefined,
        postalCode: this.addressPostalCode,
      }
    }

    return address;
  }

  private updateLocalPersonWith(person: any) {
    this.person.name = person.name;

    this.addressStreet = person.address?.street ?? undefined
    this.addressNum = person.address?.num ?? undefined
    this.addressComplement = person.address?.complement ?? undefined
    this.addressDistrict = person.address?.district ?? undefined
    this.addressPostalCode = person.address?.postalCode ?? undefined

    if (person.address && person.address.city) {
      this.selectedStateId = person.address.city.state.id;
      this.fetchCities();
      this.selectedCityId = person.address.city.id;
    }

    if (person.contacts) {
      this.personContacts = person.contacts.map((p: any) => ({ name: p.name, email: p.email, telephone: p.telephone }))
    }
  }

  private setDefaultPerson() {
    this.person = {
      name: ''
    }
  }

  new(form: NgForm) {
    form.reset()
    this.setDefaultPerson()
    this.router.navigate(['/persons/editing'])
  }

  updateTitle() {
    this.title.setTitle(this.editingCode ? `Editando Pessoa: ${this.person.name}` : "Nova Pessoa");
  }
}