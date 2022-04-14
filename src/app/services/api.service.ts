import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../clientes/clientes.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected apiURL = 'http://localhost:8080/desafio/rest/clientes';
  constructor(protected httpClient: HttpClient) { }

  getClientes(): Promise<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.apiURL).toPromise();
  }

  buscarPorTipoTributacao(tipoTributacao: string): Promise<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.apiURL + '/tipoTributacao/' + tipoTributacao).toPromise();
  }

  saveCliente(cliente: Cliente) {
    return this.httpClient.post(this.apiURL, cliente).toPromise();
  }

  deleteCliente(id: number) {
    return this.httpClient.delete(this.apiURL + '/' + id).toPromise();
  }
}
