import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CarrinhoService, } from "./carrinho.service";
import { ItemCarrinho } from "./shared/item-carrinho.model";
import { Livro } from "./shared/livro.model";

describe('Suíte de testes do serviço do carrinho', () => {

  let carrinhoService: CarrinhoService;
  let livro: Livro;
  let livro2: Livro;
  let item: ItemCarrinho;
  let item2: ItemCarrinho;
  let itens: ItemCarrinho[] = [];

  beforeEach(() => {
    carrinhoService = new CarrinhoService();


    livro = new Livro("Teste 1", "Autor de teste", "Testar primeiro livro", "editora do teste 1", 150, 2, "imagem"),
      livro2 = new Livro("Teste 1", "Autor de teste", "Testar primeiro livro", "editora do teste 1", 150, 2, "imagem"),
      item = new ItemCarrinho("Teste 1", "Testar primeiro livro", "editora do teste 1", 150, 1, "imagem"),
      item2 = new ItemCarrinho("Teste 2", "Testar segundo livro", "editora do teste 2", 80, 3, "imagem");
  });

  it ('deve adicionar um livro ao carrinho', () => {
    carrinhoService.adicionarAoCarrinho(livro);
    expect(livro).toBeDefined();
    expect(livro.carrinho).toEqual(2);
    expect(livro.preco).toEqual(150);
  });

  it ('Aumentar a quantidade no carrinho', () => {
    livro = new Livro("Teste 1", "Autor de teste", "Testar primeiro livro", "editora do teste 1", 150, 1, "imagem"),
    carrinhoService.adicionarAoCarrinho(livro);
    expect(livro).toBeDefined();
    carrinhoService.aumentarQuantidaide(livro);
    expect(livro.carrinho).toEqual(1);
    expect(livro).toBeDefined();
  });

});
