import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PersonFilter, PersonService } from '../person.service';

@Component({
  selector: 'app-search-persons',
  templateUrl: './search-persons.component.html',
  styleUrls: ['./search-persons.component.css']
})
export class SearchPersonsComponent implements OnInit {
  persons: any[] = [];
  personFilter: PersonFilter = { name: "", size: 5, page: 0 };
  totalElements: number = 0;
  @ViewChild('dataTable') dataTable: any;

  constructor(
    private service: PersonService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void { }

  fetchPersons() {
    this.service.fetchByName(this.personFilter).then(data => {
      this.persons = data['content']
      this.totalElements = data['totalElements']
    });
  }

  changePage(event: LazyLoadEvent) {
    var page = 0;
    if (event.first && event.rows)
      page = event.first / event.rows

    this.personFilter.page = page;

    this.fetchPersons();
  }

  delete(code: string) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir?',
      accept: () => this.confirmedExclusion(code)
    })
  }

  async confirmedExclusion(code: string) {
    try {
      await this.service.delete(code);
      this.messageService.add({ severity: 'success', summary: 'Exclusão', detail: 'Excluído com sucesso' })
      this.dataTable.reset();
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }

  async toggleActivation(code: string, active: boolean) {
    try {
      active = !active
      await this.service.toggleActivation(code, active)
      let person = this.persons.find(p => p.code == code)
      person.active = active
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }
}
