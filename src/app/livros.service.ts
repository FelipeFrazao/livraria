import { Injectable } from "@angular/core";
import { Livro } from "./shared/livro.model";
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()

export class LivrosService {
  // declaração das variaveis que irão receber os dados
  LivroCollection: AngularFirestoreCollection<Livro>;
  livros: Observable<Livro[]>;

  constructor (private afs: AngularFirestore) {
    // conexão com o firebase, atribuindo os valores da api nas variaveis
    this.LivroCollection = this.afs.collection<Livro>('livros');
    this.livros = this.LivroCollection.valueChanges();
    console.log();
  }
}
