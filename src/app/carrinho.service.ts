import {ItemCarrinho} from "./shared/item-carrinho.model";
import { Livro } from "./shared/livro.model";

export class CarrinhoService {
  public itens: ItemCarrinho[] = [];
  public itemCarrinho: ItemCarrinho;
  public itemCarrinhoEncontrado;
  public teste: [any];
  // Metodo para adicionar livros ao carrinho
  public adicionarAoCarrinho(livro: Livro): any {
    this.itemCarrinho = new ItemCarrinho( livro.titulo, livro.descricao, livro.editora, livro.preco, 1, livro.img);
    this.itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.titulo === this.itemCarrinho.titulo);
    if (this.itemCarrinhoEncontrado) {
      this.itemCarrinhoEncontrado.carrinho ++;
      localStorage.setItem('carrinho', JSON.stringify(this.itens));
    } else {
      this.itens.push(this.itemCarrinho);
      console.log(this.itens);
      localStorage.setItem('carrinho', JSON.stringify(this.itens));
    }
  }
  public totalCarrinho(): number {
    let total: number = 0;
    this.itens = JSON.parse(localStorage.getItem('carrinho'));
    this.itens.map((item: ItemCarrinho) => {
      total += (item.preco * item.carrinho);
    });
    return total;
  }
  public exibirItens(): ItemCarrinho[] {
    return this.itens;
  }

  public remove(array, element): any {
    return array.splice(e => e !== element);
  }
  public removerDoCarrinho(item: ItemCarrinho): void {
    // console.log(item);
    let indice: number = this.itens.findIndex(x => x.titulo === item.titulo);
    this.itens.splice(indice, 1);
    console.log(this.itens);
    localStorage.setItem('carrinho', JSON.stringify(this.itens));
  }
}
