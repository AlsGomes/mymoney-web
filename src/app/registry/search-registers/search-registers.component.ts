import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { RegistryFilter, RegistryService } from '../registry.service';

@Component({
  selector: 'app-search-registers',
  templateUrl: './search-registers.component.html',
  styleUrls: ['./search-registers.component.css']
})
export class SearchRegistersComponent implements OnInit {

  registry: RegistryFilter = { description: "", page: 0, size: 5 };
  registers: any[] = [];
  totalElements: number = 0;

  @ViewChild('dataTable') dataTable: any;

  constructor(
    private service: RegistryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void { }

  async fetch() {
    const data = await this.service.fetch(this.registry);
    this.registers = data['content']
    this.totalElements = data['totalElements']
  }

  changePage(event: LazyLoadEvent) {
    var page = 0;
    if (event.first && event.rows)
      page = event.first / event.rows

    this.registry.page = page;

    this.fetch();
  }

  async delete(code: string) {
    this.confirmationService.confirm({
      message: "Você confirmar a exclusão?",
      accept: () => this.confirmedExclusion(code)
    });

  }

  async confirmedExclusion(code: string) {
    const res = await this.service.delete(code);
    if (res) {
      this.dataTable.reset();
      this.messageService.add({ severity: 'success', summary: 'Exclusão', detail: 'Excluído com suscesso' })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Exclusão', detail: 'Houve um erro na exclusão do lançamento' })
    }
  }
}
