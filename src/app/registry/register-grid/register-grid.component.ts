import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-grid',
  templateUrl: './register-grid.component.html',
  styleUrls: ['./register-grid.component.css']
})
export class RegisterGridComponent {

  @Input() registers: any[] = [];
}
