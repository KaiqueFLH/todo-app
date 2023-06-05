import { Component } from "@angular/core";
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: 'categoria-root',
  templateUrl: '../cadastroCategoria/cadastroCategoria.component.html',
  styleUrls: ['../cadastroCategoria/cadastroCategoria.component.css']
})

export class CadastroCategoriaComponent {
  ngOnInit(): void {
    if (localStorage.getItem('listaCategorias') != null) {
      this.listaCategorias = JSON.parse(localStorage.getItem('listaCategorias'));
    }

  }
  categoriaExistente: String;
  nomeCategoria: String = "";
  listaCategorias: String[] = [];

  teste = false;

  tornaTrue(): void {

    if (!this.teste) {
      this.teste = true;

    } else {
      this.teste = false;
    }
  }





  testeIgualdade(): String {
    for (let i = 0; i < this.listaCategorias.length; i++) {
      if (this.nomeCategoria == this.listaCategorias[i]) {
        this.categoriaExistente = this.listaCategorias[i]
      }
    }
    return this.categoriaExistente

  }


  cadastrarCategoria(): void {
    console.log(this.nomeCategoria);

    if (this.nomeCategoria != "") {
      if (this.nomeCategoria != this.testeIgualdade()) {
        this.listaCategorias.push(this.nomeCategoria);
        localStorage.setItem('listaCategorias', JSON.stringify(this.listaCategorias));
      }
      else {
        alert("A Categoria que você está tentando cadastrar, já existe!")
      }
    }

    else {
      alert('*Você não Inseriu nenhuma nova categoria*');
    }

    this.nomeCategoria = '';

  }

  removerCategoria(indice): void {
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

    this.listaCategorias.splice(indice, 1)
    localStorage.setItem('listaCategorias', JSON.stringify(this.listaCategorias));

  }
}