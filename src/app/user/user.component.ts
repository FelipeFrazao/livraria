import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from "../auth.service";
import {AngularFirestore} from "angularfire2/firestore";
import { Usuario } from "../acesso/usuario.model";
import * as firebase from 'firebase';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  public useremail = firebase.auth().currentUser.email;
  constructor(public auth: AuthService, private afs: AngularFirestore) { }
  ngOnInit() {
  }

}
