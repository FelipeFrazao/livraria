import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TopoComponent implements OnInit {

  constructor(public auths: AuthService) { }
  public carrinho: number;

  ngOnInit() {
    this.auths.checaLogin();
  }

}
