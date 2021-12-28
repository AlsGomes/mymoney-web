import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PersonEditingComponent } from './person/person-editing/person-editing.component';
import { SearchPersonsComponent } from './person/search-persons/search-persons.component';
import { RegistryEditingComponent } from './registry/registry-editing/registry-editing.component';
import { SearchRegistersComponent } from './registry/search-registers/search-registers.component';

const routes = [
  { path: '', redirectTo: 'registers', pathMatch: 'full' },
  { path: 'registers', component: SearchRegistersComponent },
  { path: 'registers/editing', component: RegistryEditingComponent },
  { path: 'registers/editing/:code', component: RegistryEditingComponent },
  { path: 'persons', component: SearchPersonsComponent },
  { path: 'persons/editing/:code', component: PersonEditingComponent },
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
