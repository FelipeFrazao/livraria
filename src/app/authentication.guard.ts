import {CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor (private auth: AuthService, private router: Router) {}
  // Proteção de rotas e redirecionando para o login caso a rota seja restrita para usuários autenticados
  canActivate(): boolean {
    if (this.auth.checaLogin() === false) {
      this.router.navigate(['acesso/login']);
    }
    return this.auth.checaLogin();
  }
}
