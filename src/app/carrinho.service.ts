import {ItemCarrinho} from "./shared/item-carrinho.model";
import { Livro } from "./shared/livro.model";
import {it} from "selenium-webdriver/testing";

export class CarrinhoService {
  public itens: ItemCarrinho[];
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
    if (this.itens.length !== 0) {
      this.itens.map((item: ItemCarrinho) => {
        total += (item.preco * item.carrinho);

      });
    }
    return total;
  }

  public verificaCarrinho(): void {
    switch (this.itens) {
      case null: {
        this.itens = JSON.parse(localStorage.getItem('carrinho'));
        console.log(this.itens);
      }
        break;
      case null: {
        console.log("Não há nada no carrinho");
      }
        break;
    }
    // if (this.itens != null) {
    //   this.itemCarrinho = JSON.parse(this.itens);
    //   console.log(this.itemCarrinho);
    // } else {
    //   console.log("Não há nada no carrinho");
    // }
  }
  public exibirItens(): ItemCarrinho[] {
    if (this.itens == null) {
      this.itens = JSON.parse(localStorage.getItem('carrinho'));
    }
    return this.itens;
  }

  public removerDoCarrinho(item: ItemCarrinho): void {
    // console.log(item);
    let indice: number = this.itens.findIndex(x => x.titulo === item.titulo);
    this.itens.splice(indice, 1);
    console.log(this.itens);
    localStorage.setItem('carrinho', JSON.stringify(this.itens));
  }
}
