import { Router } from "@angular/router";
import { Usuario } from "./acesso/usuario.model";
import {Injectable} from "@angular/core";
import * as firebase from 'firebase';
import {log} from "util";

@Injectable()
export class AuthService {

  public exibir: boolean;
  public tipo: string = 'danger';
  public mensagem: string;
  public token_id: string;
  public estaLogado: boolean;
  constructor(private router: Router) { }

  public cadUser(usuario: Usuario): void {

    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
        // remover a senha do usuario
        delete usuario.senha;
        // registrando os demais dados do usuário
        firebase.firestore().doc(`usuarios/${btoa(usuario.email)}`)
          .set({
            email: usuario.email,
            nome: usuario.nome
          });
        this.exibir = true;
        this.tipo = 'success';
        this.mensagem = `Parabéns ${usuario.nome} você foi cadastrado com sucesso!`;
      })
      .catch((error: Error) => {
        this.exibir = true;
        this.tipo = 'danger';
        this.mensagem = `ERRO usuário não cadastrado ${error.message}`;
      });
  }

  public autenticar(email: string, senha: string): void {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((response: any) => {
      firebase.auth().currentUser.getIdToken()
        .then((idToken: string) => {
        this.token_id = idToken;
        localStorage.setItem('user', idToken);
        this.router.navigate(['/conta']);
        });
      })
      .catch((error: Error) => {
        this.exibir = true;
        this.tipo = 'danger';
        this.mensagem = `ERRO não foi possível efetuar o Login ${error.message}`;
      });
  }

  public resetPassword(email: string): any {
    let auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error));
  }
  public checaLogin(): boolean {

    if (this.token_id === undefined && localStorage.getItem('user') !== null) {
      this.token_id = localStorage.getItem('user');
    }
    this.estaLogado = this.token_id !== undefined;
      return this.estaLogado;
  }
  public logout(): void  {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.token_id = undefined;
        this.router.navigate(['acesso/login']);
    });
}
}
