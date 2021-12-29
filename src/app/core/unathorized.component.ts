import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unathorized',
  template: `
    <div class="container">
      <h1 class="text-center">Você não tem acesso a esta página</h1>
    </div>
  `,
  styles: [
  ]
})
export class UnathorizedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
