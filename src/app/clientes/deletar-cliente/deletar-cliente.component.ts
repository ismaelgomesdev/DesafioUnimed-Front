import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-deletar-cliente',
  templateUrl: './deletar-cliente.component.html',
  styleUrls: ['./deletar-cliente.component.scss']
})
export class DeletarClienteComponent implements OnInit {

  @Input()
  cliente = {
    id: 0,
    razaoSocial: '',
  }

  @Output() close = new EventEmitter<boolean>();

  @Output() idToDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }


  closeDialog(): void {
    this.close.emit(true)
  }

  deleteClient() {
    this.idToDelete.emit(this.cliente.id);
    this.closeDialog();
  }

}
