import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { ItemCarrinho } from '../shared/item-carrinho.model';

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

  trackByFn(index, item) {
    return index;
  }

  public diminuir(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item);
  }
  ngOnInit() {
  }
}
