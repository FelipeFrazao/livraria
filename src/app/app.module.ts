import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { ROUTES } from "./app.routes";
import { HomeComponent } from './home/home.component';
import { TopoComponent } from './topo/topo.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { AngularFirestoreModule} from "angularfire2/firestore";
import { AngularFireModule } from 'angularfire2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


export const firebaseConfig = {
  apiKey: "AIzaSyDd0K4OLAwJ5k3VohRfpmP6_pcYrt1_H2A",
  authDomain: "livraria-71416.firebaseapp.com",
  databaseURL: "https://livraria-71416.firebaseio.com",
  projectId: "livraria-71416",
  storageBucket: "livraria-71416.appspot.com",
  messagingSenderId: "915426767473"
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopoComponent,
    CarrinhoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
