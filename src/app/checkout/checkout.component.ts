import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {CarrinhoService} from '../carrinho.service';
import { Pedido } from '../model/pedido.model';
import { ItemCarrinho } from '../model/item-carrinho.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CheckoutComponent implements OnInit, OnDestroy {

  constructor(public carrinhoService: CarrinhoService) { }

  public idPedidoCompra: number;
  public itensCarrinho: ItemCarrinho[] = [];


  // Controle do formulário de compra
  public formCompra: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    'numero': new FormControl(null, [ Validators.required, Validators.minLength(1), Validators.maxLength(20) ]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [ Validators.required ])
  });

  // Otimização para performance: Ao inves de a cada atualizacação dos dados inseridos pelo NgFor, como um novo item no carrinho,
  // o Angular destruir todos os elementos e criar de novo atualizado, ele só altera o que foi modificado,
  // adicionando mais um elemento ou removendo
  trackByFn(index, item) {
    return index;
  }

  // Pega as informações do formulário e envia o pedido para o serviço
  public confirmarCompra(): void {
    if (this.formCompra.status === 'INVALID') {

      this.formCompra.get('endereco').markAsTouched();
      this.formCompra.get('numero').markAsTouched();
      this.formCompra.get('complemento').markAsTouched();
      this.formCompra.get('formaPagamento').markAsTouched();

    } else {
      if (this.carrinhoService.exibirItens().length === 0) {
        this.carrinhoService.exibir = true;
        this.carrinhoService.tipo = 'warning';
        this.carrinhoService.mensagem = `O seu carrinho está vazio!`;
      } else {
        let pedido: Pedido = new Pedido (
          this.formCompra.value.endereco,
          this.formCompra.value.numero,
          this.formCompra.value.complemento,
          this.formCompra.value.formaPagamento,
          this.carrinhoService.exibirItens()
        );
        this.carrinhoService.exibir = true;
        this.carrinhoService.tipo = 'success';
        this.carrinhoService.mensagem = `Parabéns você efetuou sua compra com sucesso!`;
        this.carrinhoService.finalizarCompra(pedido);
      }
    }
  }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
  }

  ngOnDestroy() {
    this.carrinhoService.exibir = false;
  }

}
