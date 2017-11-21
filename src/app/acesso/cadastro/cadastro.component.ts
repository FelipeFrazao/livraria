import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { Usuario } from "../usuario.model";
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CadastroComponent implements OnInit {

  constructor(private as: AuthService) { }


  public formCadastro: FormGroup = new FormGroup({
    'email': new FormControl("", Validators.email),
    'nome': new FormControl("", Validators.minLength(5)),
    'senha': new FormControl("", Validators.minLength(6))
  });

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


}
