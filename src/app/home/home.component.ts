import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {LivrosService} from "../livros.service";
import { Observable } from 'rxjs/Observable';
import { CarrinhoService } from "../carrinho.service";

import {ItemCarrinho} from "../shared/item-carrinho.model";
import {Livro} from "../shared/livro.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [LivrosService]
})
export class HomeComponent implements OnInit {

  // variavel que irá receber os dados
  public livros: Observable<Livro[]>;

  constructor(private livrosService: LivrosService, private carrinhoService: CarrinhoService) { }

  ngOnInit() {

    this.carrinhoService.exibirItens();
    // atribuição dos dados na variavel
    this.livros = this.livrosService.livros;
  }
  // Metodo para adicionar livros ao carrinho
  public adicionarAoCarrinho(livro: Livro): void {
    livro.carrinho ++;
    this.carrinhoService.itens.push(livro);
    console.log(livro.carrinho);
    localStorage.setItem('carrinho', JSON.stringify(this.carrinhoService.itens));
  }

}
