import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { CarrinhoComponent } from "./carrinho/carrinho.component";

// route map da aplicação

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'carrinho', component: CarrinhoComponent}
];
