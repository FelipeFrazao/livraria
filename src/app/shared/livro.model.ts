export class Livro {
  constructor (
    public UID: string,
    public titulo: string,
    public autor: string,
    public descricao: string,
    public editora: string,
    public preco: number,
    public carrinho: number,
    public img: string,
  ) {}
}
