import { Component } from '@angular/core';
import { stringify } from 'querystring';

interface Tarefas{
  nome:String;
  categoria:String;
  descricao:String;
  id:number;
}

@Component({
  selector: 'tarefa-root',
  templateUrl: '../cadastroTarefa/cadastroTarefa.component.html',
  styleUrls: ['../cadastroTarefa/cadastroTarefa.component.css']
})

export class CadastroTarefaComponent {
  ngOnInit(): void {
    if (localStorage.getItem('Lista de Tarefas') != null) {
      this.tarefas = JSON.parse(localStorage.getItem('Lista de Tarefas'));
    }
    
  }

  tarefas:Tarefas[] = [];

  tarefaNome:String="";
  categoriaSelecionada:String="";
  listaCategorias:String[]=[];

 
  

  tarefa:Tarefas={
    nome:null,
    categoria:null,
    descricao:null,
    id:0
  }

  cadastrarTarefa():void{
    if(this.tarefa.nome!=null){
      const usuario:Tarefas={
        nome: this.tarefa.nome,
        categoria: this.tarefa.categoria,
        descricao:this.tarefa.descricao,
        id: this.tarefa.id++
      }
      this.tarefas.push(usuario);
      this.LocalStorage()
    }
      this.tarefa.nome=null;
      this.tarefa.descricao=null;
      this.tarefa.categoria=null;
  }


  removerTarefa(indice):void{
    this.tarefas.splice(indice,1)
    this.LocalStorage()
  }

  LocalStorage(){
    localStorage.setItem("Lista de Tarefas",JSON.stringify(this.tarefas))

  }
}
