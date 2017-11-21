import { Usuario } from "./acesso/usuario.model";
import {Injectable} from "@angular/core";
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  public exibir: boolean;
  public tipo: string = 'danger';
  public mensagem: string;
  public cadUser(usuario: Usuario): void {

    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
        // remover a senha do usuario
        delete usuario.senha;
        // registrando os demais dados do usuário
        firebase.firestore().doc(`usuario/${btoa(usuario.email)}`)
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

  public autenticar(email: string, senha: string, nome: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((response: any) => {
        this.exibir = true;
        this.tipo = 'success';
        this.mensagem = `Parabéns ${nome} você foi logado com sucesso!`;
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
}
