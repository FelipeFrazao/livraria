import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()

export class CartService {

  private cartSource = new BehaviorSubject<number>(0);
  currentCart = this.cartSource.asObservable();
  constructor() {}
  updateCart(cart: number) {
    this.cartSource.next(cart);
  }
}
