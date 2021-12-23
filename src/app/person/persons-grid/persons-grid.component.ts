import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-persons-grid',
  templateUrl: './persons-grid.component.html',
  styleUrls: ['./persons-grid.component.css']
})
export class PersonsGridComponent {

  @Input() persons: any[] = [];
}
