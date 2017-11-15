import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {LivrosService} from "../livros.service";
import { Observable } from 'rxjs/Observable';
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

  constructor(private livrosService: LivrosService) { }

  ngOnInit() {
    // atribuição dos dados na variavel
    this.livros = this.livrosService.livros;
  }

}
