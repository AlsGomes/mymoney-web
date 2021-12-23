import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-persons',
  templateUrl: './search-persons.component.html',
  styleUrls: ['./search-persons.component.css']
})
export class SearchPersonsComponent {
  persons: any[] = [
    {
      "code": "aa2310d7-e159-42f9-933c-c15048588d2b",
      "name": "Alisson",
      "active": true,
      "address": {
        "street": "Rua da casa da mãe Joana",
        "num": "52",
        "complement": "Bloco J Apto. 12",
        "district": "Pracinha",
        "postalCode": "01234567",
        "city": "São Paulo",
        "state": "SP"
      }
    },
    {
      "code": "d757fb84-fcd2-43d8-b2d8-9be5f756938b",
      "name": "Cristina",
      "active": true
    }
  ];
}
