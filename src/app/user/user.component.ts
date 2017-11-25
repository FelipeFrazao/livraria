import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from '../auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuario } from '../acesso/usuario.model';
import * as firebase from 'firebase';
import {Pedido} from '../shared/pedido.model';
import {Observable} from 'rxjs/Observable';
import {ItemCarrinho} from '../shared/item-carrinho.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  comprasCollection: AngularFirestoreCollection<Pedido>;
  compras: Observable<Pedido[]>;
  public itens: Array<ItemCarrinho>;
  public usuario;

  public useremail: string;
  constructor(public auth: AuthService, private afs: AngularFirestore) {
    this.useremail = this.auth.usuario.email;
    this.usuario = afs.collection('usuario', ref => ref.where('email', '==', `${this.useremail}`)).valueChanges();
    this.comprasCollection = afs.collection('compras', ref => ref.where('usuario', '==', `${this.useremail}`));
    this.compras = this.comprasCollection.valueChanges();
  }



  ngOnInit() {

  }

}
