import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { RegistryFilter, RegistryService } from '../registry.service';

@Component({
  selector: 'app-search-registers',
  templateUrl: './search-registers.component.html',
  styleUrls: ['./search-registers.component.css']
})
export class SearchRegistersComponent implements OnInit {

  registry: RegistryFilter = { description: "", page: 0, size: 5 };
  registers: any[] = []
  totalElements: number = 0;

  constructor(private service: RegistryService) { }

  ngOnInit(): void { }

  fetch() {
    this.service.fetch(this.registry).then(data => {
      this.registers = data['content']
      this.totalElements = data['totalElements']
    });
  }

  changePage(event: LazyLoadEvent) {
    var page = 0;
    if (event.first && event.rows)
      page = event.first / event.rows

    this.registry.page = page;

    this.fetch();
  }
}
