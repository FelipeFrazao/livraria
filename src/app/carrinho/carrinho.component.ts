import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from "../cart.service";

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarrinhoComponent implements OnInit {

  public carrinho: number;

  constructor(private cartService: CartService) { }

  public pegaCart(car): void {
    this.cartService.updateCart(car);
    console.log(car);
  }

  ngOnInit() {
    this.cartService.currentCart.subscribe(cart => this.carrinho = cart);
    this.pegaCart(this.carrinho);
  }

}
