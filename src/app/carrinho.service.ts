import {ItemCarrinho} from "./shared/item-carrinho.model";
import { Livro } from "./shared/livro.model";

export class CarrinhoService {
  public itens: ItemCarrinho[] = [];

  public exibirItens(): ItemCarrinho[] {
    return this.itens;
  }
  public incluirItem(livro: Livro): void {
    console.log(livro);
  }
}
