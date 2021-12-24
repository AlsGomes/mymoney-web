import { Component, OnInit } from '@angular/core';
import { RegistryFilter, RegistryService } from '../registry.service';

@Component({
  selector: 'app-search-registers',
  templateUrl: './search-registers.component.html',
  styleUrls: ['./search-registers.component.css']
})
export class SearchRegistersComponent implements OnInit {

  registry: RegistryFilter = { description: "" };
  registers: any[] = []

  constructor(private service: RegistryService) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.service.fetch(this.registry).then(data => this.registers = data);
  }
}
