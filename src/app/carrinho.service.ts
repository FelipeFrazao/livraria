import { Injectable } from "@angular/core";
import {ItemCarrinho} from "./shared/item-carrinho.model";
import { Livro } from "./shared/livro.model";

@Injectable()
export class CarrinhoService {

  // declaração
  public itens: ItemCarrinho[] = [];
  public itemCarrinho: ItemCarrinho;
  public itemCarrinhoEncontrado;

  public porNoLocalStorage(itens: ItemCarrinho[]): void {
    localStorage.setItem('carrinho', JSON.stringify(itens));
  }
  // Verificando se o item já está no carrinho, e adiciona ou atualiza a quantidade
  public adicionarAoCarrinho(livro: Livro): any {
    this.itemCarrinho = new ItemCarrinho(livro.UID, livro.titulo, livro.descricao, livro.editora, livro.preco, 1, livro.img);
    this.itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.titulo === this.itemCarrinho.titulo);
    console.log(this.itemCarrinho);

    if (this.itemCarrinhoEncontrado) {
      this.itemCarrinhoEncontrado.carrinho ++;
      this.porNoLocalStorage(this.itens);
    } else {
      this.itens.push(this.itemCarrinho);
      this.porNoLocalStorage(this.itens);
    }
  }

  public totalCarrinho(): number {
    // Verifica se há algo no carrinho e faz o calculo do total
    let total: number = 0;

    this.itens = JSON.parse(localStorage.getItem('carrinho'));
    if (this.itens !== null) {
      this.itens.map((item: ItemCarrinho) => {
        total += (item.preco * item.carrinho);

      });
    }
    return total;
  }

  public exibirItens(): ItemCarrinho[] {
    // Verifica se há algo no carrinho, caso não haja atribui o valor do localstorage e retorna
    if (this.itens.length === 0) {
      this.itens = JSON.parse(localStorage.getItem('carrinho'));
    }
    return this.itens;
  }

  public removerDoCarrinho(item: ItemCarrinho): void {
    // encontra o item selecionado no array o remove e, atualiza o localstorage
    this.itens.splice(this.itens.indexOf(item), 1);
    this.porNoLocalStorage(this.itens);
  }

  public aumentarQuantidaide(itemCarrinho: ItemCarrinho): void {

    // incrementar quantidade
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.titulo === itemCarrinho.titulo);
    console.log(itemCarrinhoEncontrado.carrinho);
    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.carrinho ++;
      this.porNoLocalStorage(this.itens);
      console.log(itemCarrinhoEncontrado.carrinho);
    }
  }

  public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {

    // decrementar quantidade
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.titulo === itemCarrinho.titulo);

    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.carrinho -= 1;
      this.porNoLocalStorage(this.itens);

      if (itemCarrinhoEncontrado.carrinho === 0) {
        this.removerDoCarrinho(itemCarrinhoEncontrado);
      }
    }
  }
}
