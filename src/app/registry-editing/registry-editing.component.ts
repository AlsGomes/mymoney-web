import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registry-editing',
  templateUrl: './registry-editing.component.html',
  styleUrls: ['./registry-editing.component.css']
})
export class RegistryEditingComponent {

  types = [{ label: 'RECEITA', value: 'INCOME' }, { label: 'DESPESA', value: 'EXPENSE' }];
  categories = [{ label: 'Alimentação', value: 'Alimentação' }, { label: 'Transporte', value: 'Transporte' }];
  persons = [{ label: 'Cristina', value: 'Cristina' }, { label: 'Alisson', value: 'Alisson' }];

}
