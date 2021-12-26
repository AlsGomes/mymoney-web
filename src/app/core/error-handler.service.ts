import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(err: any) {
    if (typeof err === 'string') {
      this.messageService.add({ summary: "Erro", detail: err, severity: 'error' })
    } else {
      let errorMessage;
      if (err.error.userDetail)
        errorMessage = err.error.userDetail

      this.messageService.add(
        { summary: "Erro", detail: errorMessage ?? "Ops, ocorreu um erro inesperado. Não foi possível processar seu pedido", severity: 'error' }
      )
    }
  }
}
