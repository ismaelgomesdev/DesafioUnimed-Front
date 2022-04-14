import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


export interface Cliente {
  id: number;
  razaoSocial: string;
  cnpj: string;
  tipoTributacao: string;
  email: string;
}


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'razaoSocial', 'cnpj', 'tipoTributacao', 'email', 'acoes'];

  selectedFilter: 'Simples Nacional' | 'Lucro Presumido' | '' = '';

  toBeDeletedClient = {
    id: 0,
    razaoSocial: '',
  }

  showNewClient: boolean = false;

  showDeleteClient: boolean = false;

  clientes: Cliente[] = [];

  dataSource = this.clientes;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.apiService.getClientes().then(
      (data: Cliente[]) => {
        this.clientes = data;
        this.dataSource = this.clientes;
      }
    );
  }

  openNewClient() {
    this.showNewClient = true;
  }

  openDeleteClient(element: any) {
    this.showDeleteClient = true;
    this.toBeDeletedClient.id = element.id;
    this.toBeDeletedClient.razaoSocial = element.razaoSocial;
  }

  setSelectedFilter(filter: 'Simples Nacional' | 'Lucro Presumido' | '') {
    this.selectedFilter = filter;

    if (filter == 'Simples Nacional' || filter == 'Lucro Presumido') {
      this.apiService.buscarPorTipoTributacao(filter).then(
        (response) => {
          this.dataSource = response;
        }
      );
    }
    else {
      this.dataSource = this.clientes;
    }
  }

  getFilteredClientsQuantity(filter: string) {
    return this.clientes.filter(cliente => cliente.tipoTributacao.toLowerCase().includes(filter.toLowerCase())).length;
  }

  deleteClientId(id: number) {
    this.apiService.deleteCliente(id).then(
      () => {
        this.getClients();
      }
    );
  }

  saveClient(cliente: Cliente) {
    this.apiService.saveCliente(cliente).then(
      () => {
        this.getClients();
        this.showNewClient = false;
      }
    );
  }

}
