import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AcessoComponent implements OnInit {

  public cadastro: boolean = true;

  constructor() { }

  ngOnInit() {
  }
  public exibirPainel(event: string): void {
    this.cadastro = event === 'cadastro' ? true : false;
  }

}
