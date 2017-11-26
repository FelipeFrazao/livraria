import { Router } from '@angular/router';
import { Usuario } from './acesso/usuario.model';
import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  public exibir: boolean;
  public tipo: string = 'danger';
  public mensagem: string;
  public token_id: string;
  public estaLogado: boolean;
  public usuario;
  constructor(private router: Router) { }

  // Cadastra o usuário no Firebase
  public cadUser(usuario: Usuario): void {

    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
        // remover a senha do usuario
        delete usuario.senha;
        // registrando os demais dados do usuário
        firebase.firestore().doc(`usuario/${btoa(usuario.email)}`)
          .set({
            email: usuario.email,
            nome: usuario.nome,
            carrinho: ''
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

  // Autentica o usuário no  Firebase
  public autenticar(email: string, senha: string): void {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((response: any) => {
        this.usuario = firebase.auth().currentUser;
        firebase.auth().currentUser.getIdToken()
          .then((idToken: string) => {
            this.token_id = idToken;
            this.router.navigate(['/conta']);
          });
      })
      .catch((error: Error) => {
        this.exibir = true;
        this.tipo = 'danger';
        this.mensagem = `ERRO não foi possível efetuar o login ${error.message}`;
      });
  }

  public resetPassword(email: string): any {
    let auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => {
        this.exibir = true;
        this.tipo = 'success';
        this.mensagem = `Um email foi enviado para ${email} para restaurar a senha`;
      })
      .catch((error) => {
        this.exibir = true;
        this.tipo = 'danger';
        this.mensagem = `ERRO não foi possível restaurar a senha ${error.message}`;
      });
  }

  // Checa se o usuário está autenticado e retorna o valor
  public checaLogin(): boolean {

    // Verifica se há algum token em memoria ou no localstorage
    if (this.token_id === undefined
      &&
      localStorage.getItem('firebase:authUser:AIzaSyDd0K4OLAwJ5k3VohRfpmP6_pcYrt1_H2A:[DEFAULT]') !== null) {
      // Atribui o valor do usuário e o do token do localstorage
      this.usuario = JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyDd0K4OLAwJ5k3VohRfpmP6_pcYrt1_H2A:[DEFAULT]'));
      this.token_id = this.usuario.stsTokenManager.accessToken;
    }
    this.estaLogado = this.token_id !== undefined;
    return this.estaLogado;
  }

  // Desconecta o usuário do Firebase, remove do localstorage e redireciona pra tela de login
  public logout(): void  {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('firebase:authUser:AIzaSyDd0K4OLAwJ5k3VohRfpmP6_pcYrt1_H2A:[DEFAULT]');
        this.router.navigate(['acesso/login']);
        this.estaLogado = false;

      });
  }
}
