import { Routes } from "@angular/router";
import { AuthenticationGuard } from "./authentication.guard";

import { HomeComponent } from "./home/home.component";
import { CarrinhoComponent } from "./carrinho/carrinho.component";
import {AcessoComponent} from "./acesso/acesso.component";
import {CadastroComponent} from "./acesso/cadastro/cadastro.component";
import {LoginComponent} from "./acesso/login/login.component";
import {UserComponent} from "./user/user.component";
import {CheckoutComponent} from "./checkout/checkout.component";

// route map da aplicação

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'acesso', component: AcessoComponent, children: [
    {path: '', component: CadastroComponent},
    {path: 'login', component: LoginComponent}
  ]},
  {path: 'conta', component: UserComponent, canActivate: [ AuthenticationGuard ]},
  {path: 'checkout', component: CheckoutComponent}
];
