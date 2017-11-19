import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {LivrosService} from "../livros.service";
import { Observable } from 'rxjs/Observable';
import { CarrinhoService } from "../carrinho.service";
import { ChangeDetectionStrategy } from "@angular/core";

import {ItemCarrinho} from "../shared/item-carrinho.model";
import {Livro} from "../shared/livro.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  // variavel que irá receber os dados
  public livros: Observable<Livro[]>;

  constructor(private livrosService: LivrosService, private carrinhoService: CarrinhoService) { }

  trackByFn(index, livro) {
    return index;
  }

  ngOnInit() {
    // atribuição dos dados na variavel
    this.livros = this.livrosService.livros;
  }

}
