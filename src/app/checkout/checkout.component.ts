import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {CarrinhoService} from '../carrinho.service';
import { Pedido } from '../shared/pedido.model';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckoutComponent implements OnInit {

  constructor(public carrinhoService: CarrinhoService) { }

  public idPedidoCompra: number;
  public itensCarrinho: ItemCarrinho[] = [];

  public formCompra: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    'numero': new FormControl(null, [ Validators.required, Validators.minLength(1), Validators.maxLength(20) ]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [ Validators.required ])
  });

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
  }

  public confirmarCompra(): void {
    if (this.formCompra.status === 'INVALID') {

      this.formCompra.get('endereco').markAsTouched();
      this.formCompra.get('numero').markAsTouched();
      this.formCompra.get('complemento').markAsTouched();
      this.formCompra.get('formaPagamento').markAsTouched();

    } else {
      if (this.carrinhoService.exibirItens().length === 0) {
        alert('O carrinho está vazio');
      } else {
        let pedido: Pedido = new Pedido (
          this.formCompra.value.endereco,
          this.formCompra.value.numero,
          this.formCompra.value.complemento,
          this.formCompra.value.formaPagamento,
          this.carrinhoService.exibirItens()
        );
        this.carrinhoService.finalizarCompra(pedido);

        console.log(pedido);
        // this.ordemCompraService.efetivarCompra(pedido)
        //   .subscribe((idPedido: number) => {
        //     this.idPedidoCompra = idPedido;
        //   });
      }
    }
  }


}
