import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(error: any) {
    if (typeof error === 'string') {
      this.messageService.add({ summary: "Erro", detail: error, severity: 'error' })
    } else {
      this.messageService.add({ summary: "Erro", detail: "Ops, ocorreu um erro inesperado. Não foi possível processar seu pedido", severity: 'error' })
    }
  }
}
