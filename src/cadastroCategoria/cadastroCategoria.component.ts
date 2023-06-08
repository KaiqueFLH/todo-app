import { Component } from "@angular/core";
import { splitNamespace } from "@angular/core/src/view/util";

interface Categoria{
  nomeCategoria:String;
  cor:String;
}

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
  categoriaExistente:Categoria;
  nomeCategoria:String="";
  cor:String="#ffffff";
  listaCategorias: Categoria[] = [];
  
  

  teste = false;

  tornaTrue(): void {

    if (!this.teste) {
      this.teste = true;

    } else {
      this.teste = false;
    }
  }



  verificarIgualdade(): boolean {

    for (const i of this.listaCategorias) {
      if (i.nomeCategoria === this.nomeCategoria) {
        return false;
      }
    }

    return true;
  }


  cadastrarCategoria(): void {
    console.log(this.nomeCategoria);

    const categoria: Categoria = {
      nomeCategoria: this.nomeCategoria,
      cor: this.cor
    }

    if (this.nomeCategoria != "") {
      
      if (this.verificarIgualdade()) {
        this.listaCategorias.push(categoria);
        
        localStorage.setItem('listaCategorias', JSON.stringify(this.listaCategorias));
      }
      else {
        alert("A Categoria que você está tentando cadastrar, já existe!")
      }
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