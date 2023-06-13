import { Component } from "@angular/core";
import { splitNamespace } from "@angular/core/src/view/util";

interface Categoria {
  nomeCategoria: String;
  cor: String;
}
interface Propriedade {
  nome: String,
  tipo: String | number | String[];
}


@Component({
  selector: 'categoria-root',
  templateUrl: '../cadastroCategoria/cadastroCategoria.component.html',
  styleUrls: ['../cadastroCategoria/cadastroCategoria.component.css']
})

export class CadastroCategoriaComponent {
  nome: String;
  tipo: String | number | String[];
  tipoS:String;
  tipoN:number;
  tipoSC:String[];
  listaTipos: String[] = ["Texto", "Número", "Seleção"]
  listaPropriedades: Propriedade[] = [];

  ngOnInit(): void {
    if (localStorage.getItem('listaCategorias') != null) {
      this.listaCategorias = JSON.parse(localStorage.getItem('listaCategorias'));
    }

  }

  categoriaExistente: Categoria;
  nomeCategoria: String = "";
  cor: String = "#ffffff";
  listaCategorias: Categoria[] = [];



  teste = false;

  tornaTrue(): void {

    if (!this.teste) {
      this.teste = true;

    } else {
      this.teste = false;
    }
  }

  cadastrarPropriedade(): void {
    const prop: Propriedade = {
      nome: this.nome,
      tipo: this.tipo
    }

    this.listaPropriedades.push(prop);

    localStorage.setItem('listaProp', JSON.stringify(this.listaPropriedades));

  }



  verificarIgualdade(): boolean {

    for (const i of this.listaCategorias) {
      if (i.nomeCategoria === this.nomeCategoria) {
        return false;
      }
    }

    return true;
  }

  // contraste(cor: string): string {
  //   const r = parseInt(String(cor).substr(1, 2), 16);
  //   const g = parseInt(String(cor).substr(3, 2), 16);
  //   const b = parseInt(String(cor).substr(5, 2), 16);
  //   const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
  //   return luz > 128 ? '#000' : '#fff'
  // }


  // cadastrarCategoria(): void {
  //   console.log(this.nomeCategoria);

  //   const categoria: Categoria = {
  //     nomeCategoria: this.nomeCategoria,
  //     cor: this.cor
  //   }

  //   if (this.nomeCategoria != "") {

  //     if (this.verificarIgualdade()) {
  //       this.listaCategorias.push(categoria);

  //       localStorage.setItem('listaCategorias', JSON.stringify(this.listaCategorias));
  //     }
  //     else {
  //       alert("A Categoria que você está tentando cadastrar, já existe!")
  //     }
  //   }

  //   this.nomeCategoria = '';

  //}

  removerPropriedade(indice): void {
    let listaTarefas = []
    if (localStorage.getItem('Lista de Tarefas') != null) {
      listaTarefas = JSON.parse(localStorage.getItem('Lista de Tarefas'));
    }

    for (let tarefa of listaTarefas) {
      console.log('a');
      if (tarefa.categoria == this.listaCategorias[indice]) {

        listaTarefas.splice(listaTarefas.indexOf(tarefa), listaTarefas.length)
      }
    }

    localStorage.setItem('Lista de Tarefas', JSON.stringify(listaTarefas))

    this.listaPropriedades.splice(indice, 1)
    localStorage.setItem('listaPropriedades', JSON.stringify(this.listaPropriedades));

  }
}