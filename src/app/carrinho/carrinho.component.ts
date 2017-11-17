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


  ngOnInit() {
  }
}
