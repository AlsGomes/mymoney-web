import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { UnathorizedComponent } from './core/unathorized.component';
import { PersonEditingComponent } from './person/person-editing/person-editing.component';
import { SearchPersonsComponent } from './person/search-persons/search-persons.component';
import { RegistryEditingComponent } from './registry/registry-editing/registry-editing.component';
import { SearchRegistersComponent } from './registry/search-registers/search-registers.component';
import { RegisterReportsComponent } from './reports/register-reports/register-reports.component';
import { AuthGuard } from './security/auth.guard';
import { LoginFormComponent } from './security/login-form/login-form.component';

const routes = [
    { path: 'login', component: LoginFormComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'reports/register', component: RegisterReportsComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] } },

    { path: 'registers', component: SearchRegistersComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] } },
    { path: 'registers/editing', component: RegistryEditingComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] } },
    { path: 'registers/editing/:code', component: RegistryEditingComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] } },

    { path: 'persons', component: SearchPersonsComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_PESQUISAR_PESSOA'] } },
    { path: 'persons/editing', component: PersonEditingComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CADASTRAR_PESSOA'] } },
    { path: 'persons/editing/:code', component: PersonEditingComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CADASTRAR_PESSOA'] } },

    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: 'unathorized', component: UnathorizedComponent },
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