import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-carrinho',
  templateUrl: './modal-carrinho.component.html',
  styleUrls: ['./modal-carrinho.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class ModalCarrinhoComponent implements OnInit {

  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(ModalCarrinho);
    modalRef.componentInstance.mensagem = 'World';
  }
  ngOnInit() {
  }

}

export class ModalCarrinho {
  @Input() mensagem;

  constructor(public activeModal: NgbActiveModal) {}
}
