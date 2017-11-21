import { Usuario } from "./acesso/usuario.model";
import {Injectable} from "@angular/core";
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
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
        console.log("usuario criado");
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  public autenticar(email: string, senha: string): void {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((response: any) => console.log(response))
      .catch((error: Error) => console.log(error));
  }
}
