import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from "../cart.service";

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TopoComponent implements OnInit {

  constructor(private cartService: CartService) { }
  public carrinho: number;

  ngOnInit() {
    this.cartService.currentCart.subscribe(cart => this.carrinho = cart);
  }

}
