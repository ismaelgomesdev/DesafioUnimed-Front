import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss']
})
export class NovoClienteComponent implements OnInit {
  @Output() backToClients = new EventEmitter();

  @Output() clientToSave = new EventEmitter();
  
  cliente = {
    razaoSocial: '',
    cnpj: '',
    tipoTributacao: '',
    email: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  goBack(){
    this.backToClients.emit(true);
  }

  saveClient() {
    this.clientToSave.emit(this.cliente);
  }

}
