import { Injectable } from '@angular/core';
import {ItemCarrinho} from './shared/item-carrinho.model';
import { Livro } from './shared/livro.model';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';
import {Pedido} from './shared/pedido.model';

@Injectable()
export class CarrinhoService {

  // declaração
  public itens: ItemCarrinho[] = [];
  public itemCarrinho: ItemCarrinho;
  public itemCarrinhoEncontrado;

  constructor (private as: AuthService) { }

  public salvarCarrinho(itens: ItemCarrinho[]): void {

    // if (this.as.estaLogado === true) {
    //   let user = JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyDd0K4OLAwJ5k3VohRfpmP6_pcYrt1_H2A:[DEFAULT]'));
    //   let carrinho: any;
    //   carrinho = itens;
    //   firebase.firestore().doc(`usuario/${btoa(user.email)}`).collection('carrinho')
    //     .add({
    //       titulo: this.itemCarrinho.titulo,
    //       preco: this.itemCarrinho.preco,
    //       carrinho: this.itemCarrinho.carrinho,
    //       descricao: this.itemCarrinho.descricao,
    //       img: this.itemCarrinho.img,
    //       editora: this.itemCarrinho.editora
    //     });
    // } else {
       localStorage.setItem('carrinho', JSON.stringify(itens));
    // }
  }
  // Verificando se o item já está no carrinho, e adiciona ou atualiza a quantidade
  public adicionarAoCarrinho(livro: Livro): any {
    this.itemCarrinho = new ItemCarrinho(livro.UID, livro.titulo, livro.descricao, livro.editora, livro.preco, 1, livro.img);
    this.itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.titulo === this.itemCarrinho.titulo);
    console.log(this.itemCarrinho);

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
        itens: pedido.itens
      })
      .then((response) => {
        console.log(`foi tudo de boa ${response}`);
        this.itens = [];
        localStorage.removeItem('carrinho');
      })
      .catch((erro: Error) => {
      console.log(`Deu errado ${erro}`);
      });
  }
}
