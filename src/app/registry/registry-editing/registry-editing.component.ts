import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from 'src/app/category/category.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-registry-editing',
  templateUrl: './registry-editing.component.html',
  styleUrls: ['./registry-editing.component.css']
})
export class RegistryEditingComponent implements OnInit {

  categories: any[] = [];
  types = [{ label: 'RECEITA', value: 'INCOME' }, { label: 'DESPESA', value: 'EXPENSE' }];
  persons = [{ label: 'Cristina', value: 'Cristina' }, { label: 'Alisson', value: 'Alisson' }];

  constructor(
    private service: CategoryService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.fetchCategories()
  }

  async fetchCategories() {
    try {
      const res = await this.service.fetchAll();
      this.categories = res.map((cat: Category) => ({ label: cat.name, value: cat.code }))
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }
}
