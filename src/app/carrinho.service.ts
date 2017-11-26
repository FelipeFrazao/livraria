import { Injectable } from '@angular/core';
import {ItemCarrinho} from './model/item-carrinho.model';
import { Livro } from './model/livro.model';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';
import {Pedido} from './model/pedido.model';
import DateTimeFormat = Intl.DateTimeFormat;

@Injectable()
export class CarrinhoService {

  // declaração
  public itens: ItemCarrinho[] = [];
  public itemCarrinho: ItemCarrinho;
  public itemCarrinhoEncontrado;
  public exibir: boolean;
  public tipo: string = 'danger';
  public mensagem: string;

  constructor (private as: AuthService) { }

  public salvarCarrinho(itens: ItemCarrinho[]): void {
       localStorage.setItem('carrinho', JSON.stringify(itens));
  }
  // Verificando se o item já está no carrinho, e adiciona ou atualiza a quantidade
  public adicionarAoCarrinho(livro: Livro): any {
    this.itemCarrinho = new ItemCarrinho(livro.titulo, livro.descricao, livro.editora, livro.preco, 1, livro.img);
    this.itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.titulo === this.itemCarrinho.titulo);

    if (this.itemCarrinhoEncontrado) {
      this.itemCarrinhoEncontrado.carrinho ++;
      this.salvarCarrinho(this.itens);
    } else {
      this.itens.push(this.itemCarrinho);
      this.salvarCarrinho(this.itens);
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
    } else {
    }
    return this.itens;
  }

  public removerDoCarrinho(item: ItemCarrinho): void {
    // encontra o item selecionado no array o remove e, atualiza o localstorage
    this.itens.splice(this.itens.indexOf(item), 1);
    this.salvarCarrinho(this.itens);
  }

  public aumentarQuantidade(itemCarrinho: ItemCarrinho): void {

    // incrementar quantidade
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.titulo === itemCarrinho.titulo);
    console.log(itemCarrinhoEncontrado.carrinho);
    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.carrinho ++;
      this.salvarCarrinho(this.itens);
      console.log(itemCarrinhoEncontrado.carrinho);
    }
  }

  public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {

    // decrementar quantidade
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.titulo === itemCarrinho.titulo);

    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.carrinho -= 1;
      this.salvarCarrinho(this.itens);

      if (itemCarrinhoEncontrado.carrinho === 0) {
        this.removerDoCarrinho(itemCarrinhoEncontrado);
      }
    }
  }


  public finalizarCompra(pedido: Pedido): any {
    let email = firebase.auth().currentUser.email;
    firebase.firestore().doc(`compras/${btoa(email)}`)
      .set({
        usuario: email,
        endereco: pedido.endereco,
        complemento: pedido.complemento,
        numero: pedido.numero,
        formaDePagamento: pedido.formaPagamento,
        itens: pedido.itens,
        data: new Date(),
        total: this.totalCarrinho()
      })
      .then((response) => {
        this.itens = [];
        this.salvarCarrinho(this.itens);
      })
      .catch((erro: Error) => {
        this.exibir = true;
        this.tipo = 'danger';
        this.mensagem = `Sentimos muito, ${this.as.usuario.nome} mas sua compra não pode ser efetuada: ${erro.message}`;
      });
  }
}
