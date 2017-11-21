import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {FormGroup, FormControl, Validators} from "@angular/forms";
import { Usuario } from "../usuario.model";
import { AuthService } from "../../auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup = new FormGroup({
    'email': new FormControl("", Validators.email),
    'senha': new FormControl("", Validators.required)
  });
  constructor( private  auth: AuthService) { }

  ngOnInit() {
  }
  public login(): void {
    this.auth.autenticar(
      this.formLogin.value.email,
      this.formLogin.value.senha
      );
  }
}
