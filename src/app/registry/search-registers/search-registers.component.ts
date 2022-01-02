import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/security/auth.service';
import { RegistryService } from '../registry.service';

@Component({
  selector: 'app-search-registers',
  templateUrl: './search-registers.component.html',
  styleUrls: ['./search-registers.component.css']
})
export class SearchRegistersComponent implements OnInit {

  registers: any[] = [];
  totalElements: number = 0;
  form: FormGroup = new FormGroup({});

  @ViewChild('dataTable') dataTable: any;

  constructor(
    private service: RegistryService,
    private messageService: MessageService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.title.setTitle("Pesquisa de Registros")
    this.configForm()
  }

  configForm() {
    this.form = this.formBuilder.group({
      description: [''],
      dueDateFrom: [undefined, [this.isValidDateRange]],
      dueDateUntil: [undefined, [this.isValidDateRange]],
      page: [0],
      size: [5]
    },);
  }

  isValidDateRange(input: FormControl) {
    const dueDateFrom = input.root.get('dueDateFrom')?.value;
    const dueDateUntil = input.root.get('dueDateUntil')?.value;

    const dueDateFromAsDate = dueDateFrom ? new Date(dueDateFrom) : undefined
    const dueDateUntilAsDate = dueDateUntil ? new Date(dueDateUntil) : undefined

    if (!dueDateFromAsDate || !dueDateUntilAsDate)
      return null

    const isValid = (dueDateFromAsDate <= dueDateUntilAsDate ? null : { invalidRange: true })
    console.log(isValid)
    
    return isValid
  }

  async fetch() {
    try {
      const data = await this.service.fetch(this.form!.value);
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

    this.form!.get('page')!.setValue(page);

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
