import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export class NotAuthenticatedError { }

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router) { }

  handle(err: any) {
    if (typeof err === 'string') {
      this.messageService.add({ summary: "Erro", detail: err, severity: 'error' })
    } else {
      let errorMessage;

      if (err instanceof NotAuthenticatedError) {
        errorMessage = "Sua sessão expirou. Faça login novamente."
        this.router.navigate(['/login'])
      } else if (err.error?.userDetail) {
        errorMessage = err.error.userDetail
      } else if (err.status === 400 && err.error.error === "invalid_grant") {
        errorMessage = "Usuário ou senha inválido"
      } else if (err.status === 401 && err.error.error_description === "Usuário não encontrado") {
        errorMessage = "Usuário ou senha inválido"
      } else if (err.status === 403) {
        errorMessage = "Você não tem permissão para executar esta ação"
      }

      this.messageService.add(
        { summary: "Erro", detail: errorMessage ?? "Ops, ocorreu um erro inesperado. Não foi possível processar sua solicitação", severity: 'error' }
      )
    }
  }
}
