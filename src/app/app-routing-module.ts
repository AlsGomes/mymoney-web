import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { PersonEditingComponent } from './person/person-editing/person-editing.component';
import { SearchPersonsComponent } from './person/search-persons/search-persons.component';
import { RegistryEditingComponent } from './registry/registry-editing/registry-editing.component';
import { SearchRegistersComponent } from './registry/search-registers/search-registers.component';
import { LoginFormComponent } from './security/login-form/login-form.component';

const routes = [
    { path: 'login', component: LoginFormComponent },

    { path: '', redirectTo: 'registers', pathMatch: 'full' },
    { path: 'registers', component: SearchRegistersComponent },
    { path: 'registers/editing', component: RegistryEditingComponent },
    { path: 'registers/editing/:code', component: RegistryEditingComponent },

    { path: 'persons', component: SearchPersonsComponent },
    { path: 'persons/editing', component: PersonEditingComponent },
    { path: 'persons/editing/:code', component: PersonEditingComponent },

    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'page-not-found' },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    providers: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }