import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Good Shelf';
  constructor () { }

  ngOnInit () {
    let config = {
      apiKey: 'AIzaSyDd0K4OLAwJ5k3VohRfpmP6_pcYrt1_H2A',
      authDomain: 'livraria-71416.firebaseapp.com',
      databaseURL: 'https://livraria-71416.firebaseio.com',
      projectId: 'livraria-71416',
      storageBucket: 'livraria-71416.appspot.com',
      messagingSenderId: '915426767473'
    };
    firebase.initializeApp(config);
  }
}
