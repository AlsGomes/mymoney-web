import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/security/auth.service';
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
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Pesquisa de Registros")
  }

  async fetch() {
    try {
      const data = await this.service.fetch(this.registry);
      this.registers = data['content']
      this.totalElements = data['totalElements']
    } catch (err) {
      this.errorHandler.handle("Não foi possível buscar os dados");
      console.log(err)
    }
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
    try {
      await this.service.delete(code);
      this.dataTable.reset();
      this.messageService.add({ severity: 'success', summary: 'Exclusão', detail: 'Excluído com sucesso' })
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }

  hasAuthority(authority: string): boolean {
    return this.authService.hasAuthority(authority)
  }
}
