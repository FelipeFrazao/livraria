import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { ItemCarrinho } from '../model/item-carrinho.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./carrinho.component.css'],
  providers: [CarrinhoService],
  encapsulation: ViewEncapsulation.None
})
export class CarrinhoComponent implements OnInit {

  constructor(public carrinhoService: CarrinhoService) { }

  public aumentar(item: ItemCarrinho): void {
    this.carrinhoService.aumentarQuantidade(item);
  }

  // Otimização para performance: Ao inves de a cada atualizacação dos dados inseridos pelo NgFor, como um novo item no carrinho,
  // o Angular destruir todos os elementos e criar de novo atualizado, ele só altera o que foi modificado,
  // adicionando mais um elemento ou removendo
  trackByFn(index, item) {
    return index;
  }

  public diminuir(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item);
  }
  ngOnInit() {
  }
}
