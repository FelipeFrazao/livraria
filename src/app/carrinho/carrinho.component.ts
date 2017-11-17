import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CarrinhoService } from "../carrinho.service";
import {ItemCarrinho} from "../shared/item-carrinho.model";

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarrinhoComponent implements OnInit {

  public itens;
  public itemCarrinho: ItemCarrinho;
  constructor(public carrinhoService: CarrinhoService) { }

  public verificaCarrinho(itens): void {
    itens = localStorage.getItem('carrinho');
    if (itens != null) {
      this.itemCarrinho = JSON.parse(itens);
      console.log(this.itemCarrinho);
    } else {
      console.log("Não há nada no carrinho");
    }
  }

  ngOnInit() {
    // this.verificaCarrinho(this.itemCarrinho);
    this.itens = this.carrinhoService.exibirItens();
  }
}
