import {ItemCarrinho} from "./shared/item-carrinho.model";
import { Livro } from "./shared/livro.model";

export class CarrinhoService {
  public itens: ItemCarrinho[] = [];

  // Metodo para adicionar livros ao carrinho
  public adicionarAoCarrinho(livro: Livro): void {
    let itemCarrinho: ItemCarrinho = new ItemCarrinho(livro.titulo, livro.descricao, livro.editora, livro.preco, 1, livro.img);


    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.titulo === itemCarrinho.titulo);
    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.carrinho ++;
      localStorage.setItem('carrinho', JSON.stringify(this.itens));
    } else {
      this.itens.push(itemCarrinho);
      console.log(this.itens);
      localStorage.setItem('carrinho', JSON.stringify(this.itens));
    }
  }
  public totalCarrinho(): number {
    let total: number = 0;
    this.itens.map((item: ItemCarrinho) => {
      total += (item.preco * item.carrinho);
    });
    return total;
}

  public exibirItens(): ItemCarrinho[] {
    return this.itens;
  }
}
