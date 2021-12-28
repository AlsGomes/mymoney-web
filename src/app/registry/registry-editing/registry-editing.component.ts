import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/category/category.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Category } from 'src/app/core/model/category';
import { PersonSummary } from 'src/app/core/model/person';
import { RegistryDTOInsert } from 'src/app/core/model/registry';
import { PersonService } from 'src/app/person/person.service';
import { RegistryService } from '../registry.service';

@Component({
  selector: 'app-registry-editing',
  templateUrl: './registry-editing.component.html',
  styleUrls: ['./registry-editing.component.css']
})
export class RegistryEditingComponent implements OnInit {

  categories: any[] = [];
  persons: any[] = [];
  types = [{ name: 'RECEITA', code: 'INCOME' }, { name: 'DESPESA', code: 'EXPENSE' }];

  registry: RegistryDTOInsert = {
    description: "",
    type: 'EXPENSE',
    value: 0,
    category: { code: '' },
    person: { code: '' }
  };

  editingCode: string | undefined;

  constructor(
    private categoryService: CategoryService,
    private personService: PersonService,
    private messageService: MessageService,
    private service: RegistryService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit(): void {
    this.fetchCategories()
    this.fetchPersons()

    this.editingCode = this.route.snapshot.params['code'];
    if (this.editingCode) {
      this.fetchRegister(this.editingCode)
    } else {
      this.updateTitle()
    }
  }

  private setDefaultRegistry(): void {
    this.registry = {
      description: "",
      type: 'EXPENSE',
      value: 0,
      category: { code: '' },
      person: { code: '' }
    }
  }

  async fetchRegister(code: string) {
    const res = await this.service.fetchByCode(code);

    if (res.userDetail) {
      this.errorHandler.handle(res.userDetail)
    } else {
      this.updateLocalRegistryWith(res)
      this.updateTitle()
    }
  }

  async fetchCategories() {
    try {
      const res = await this.categoryService.fetchAll();
      this.categories = res.map((cat: Category) => ({ label: cat.name, value: cat.code }))
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }

  async fetchPersons() {
    try {
      const res = await this.personService.fetchAll();
      this.persons = res.map((p: PersonSummary) => ({ label: p.name, value: p.code }))
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }

  save(form: NgForm) {
    if (!this.editingCode) {
      this.saveNew()
    } else {
      this.update(this.editingCode)
    }
  }

  async saveNew() {
    try {
      const res = await this.service.save(this.registry)
      this.messageService.add({ severity: 'success', summary: 'Lançamento', detail: 'Lançamento adicionado com sucesso' })
      this.router.navigate(['/registers/editing', res.code])
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }

  async update(code: string) {
    try {
      const res = await this.service.update(this.registry, code)
      this.updateLocalRegistryWith(res)
      this.updateTitle()
      this.messageService.add({ severity: 'success', summary: 'Lançamento', detail: 'Lançamento editado com sucesso' })
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }

  new(form: NgForm) {
    form.reset()
    setTimeout(this.setDefaultRegistry.bind(this), 1);
    this.router.navigate(['/registers/editing'])
  }

  private updateLocalRegistryWith(registry: any) {
    this.registry.category.code = registry.category.code
    this.registry.person.code = registry.person.code
    this.registry.dueDate = registry.dueDate
    this.registry.paymentDate = registry.paymentDate
    this.registry.obs = registry.obs
    this.registry.description = registry.description
    this.registry.type = registry.type
    this.registry.value = registry.value

    const offset = new Date().getTimezoneOffset() * 60000
    this.registry.dueDate = new Date(new Date(registry.dueDate).getTime() + offset)
    if (registry.paymentDate)
      this.registry.paymentDate = new Date(new Date(registry.paymentDate).getTime() + offset)
  }

  private updateTitle() {
    this.title.setTitle(this.editingCode ? `Editando Registro: ${this.registry.description}` : "Novo Registro");
  }
}
