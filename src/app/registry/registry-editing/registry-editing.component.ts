import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    dueDate: "",
    type: 'EXPENSE',
    value: 0,
    category: { code: '' },
    person: { code: '' }
  };

  constructor(
    private categoryService: CategoryService,
    private personService: PersonService,
    private messageService: MessageService,
    private service: RegistryService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['code'])
    
    this.fetchCategories()
    this.fetchPersons()
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

  async save(form: NgForm) {
    try {
      await this.service.save(this.registry)
      this.messageService.add({ severity: 'success', summary: 'Lançamento', detail: 'Lançamento adicionado com sucesso' })
      form.reset();
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }
}
