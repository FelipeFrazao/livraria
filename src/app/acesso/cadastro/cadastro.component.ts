import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { Usuario } from '../usuario.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./cadastro.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CadastroComponent implements OnInit, OnDestroy {

  constructor(private as: AuthService) { }


  // Controlador do formulário
  public formCadastro: FormGroup = new FormGroup({
    'email': new FormControl('', Validators.email),
    'nome': new FormControl('', Validators.minLength(5)),
    'senha': new FormControl('', Validators.minLength(6))
  });

  // Envia os dados do usuário para o serviço de autenticação
  public cadUser(): any {

    let usuario: Usuario = new Usuario (
      this.formCadastro.value.nome,
      this.formCadastro.value.email,
      this.formCadastro.value.senha
    );
    this.as.cadUser(usuario);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Apaga a mensagem
    this.as.exibir = false;
  }

}
