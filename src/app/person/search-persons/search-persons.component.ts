import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PersonFilter, PersonService } from '../person.service';

@Component({
  selector: 'app-search-persons',
  templateUrl: './search-persons.component.html',
  styleUrls: ['./search-persons.component.css']
})
export class SearchPersonsComponent implements OnInit {
  persons: any[] = [];
  personFilter: PersonFilter = { name: "", size: 5, page: 0 };
  totalElements: number = 0;

  constructor(private service: PersonService) { }

  ngOnInit(): void { }

  fetchPersons() {
    this.service.fetchByName(this.personFilter).then(data => {
      this.persons = data['content']
      this.totalElements = data['totalElements']
    });
  }

  changePage(event: LazyLoadEvent) {
    var page = 0;
    if (event.first && event.rows)
      page = event.first / event.rows

    this.personFilter.page = page;

    this.fetchPersons();
  }
}
