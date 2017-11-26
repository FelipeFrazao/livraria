import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Usuario } from '../usuario.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {

  public formLogin: FormGroup = new FormGroup({
    'email': new FormControl('', Validators.email),
    'senha': new FormControl('', Validators.required)
  });
  constructor( private  auth: AuthService) { }

  public passReset: boolean = false;

  public resetarSenha() {
    this.auth.resetPassword(this.formLogin.value['email'])
      .then(() => this.passReset = true);
  }
  ngOnInit() {
  }
  // Envia os parametros de login do formulário de login para o serviço de autenticação
  public login(): void {
    this.auth.autenticar(
      this.formLogin.value.email,
      this.formLogin.value.senha
    );
  }
  ngOnDestroy() {
    // Apaga a mensagem
    this.auth.exibir = false;
  }
}
