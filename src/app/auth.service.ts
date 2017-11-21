import { Usuario } from "./acesso/usuario.model";
import {Injectable} from "@angular/core";
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  public cadUser(usuario: Usuario): void {
    console.log(usuario);

    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
      console.log("Usuário cadastrado");
      })
      .catch((error: Error) => {
      console.log(error);
      });
  }
}
