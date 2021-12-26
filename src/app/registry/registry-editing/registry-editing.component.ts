import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from 'src/app/category/category.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PersonService, PersonSummary } from 'src/app/person/person.service';

@Component({
  selector: 'app-registry-editing',
  templateUrl: './registry-editing.component.html',
  styleUrls: ['./registry-editing.component.css']
})
export class RegistryEditingComponent implements OnInit {

  categories: any[] = [];
  persons: any[] = [];
  types = [{ label: 'RECEITA', value: 'INCOME' }, { label: 'DESPESA', value: 'EXPENSE' }];

  constructor(
    private categoryService: CategoryService,
    private personService: PersonService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
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
}
