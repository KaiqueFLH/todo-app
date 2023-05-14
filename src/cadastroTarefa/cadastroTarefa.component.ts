import { Component } from '@angular/core';
import { stringify } from 'querystring';

interface Tarefas{
  tarefaNome:String;
  descricao:String;
  categoria:String;
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
    if (localStorage.getItem('listaCategorias') != null) {
      this.listaCategorias = JSON.parse(localStorage.getItem('listaCategorias'));
    }
    
  }

  tarefas:Tarefas[] = [];
  listaCategorias:String[]=[];
  tarefaNome:String=null;
  categoria:String=null;
  descricao:String=null;
  

  tarefa:Tarefas={
    tarefaNome:"",
    descricao:"",
    categoria:""
  }

  cadastrarTarefa():void{

    if(this.tarefa.tarefaNome!="" && this.tarefa.categoria!=""){
      const usuario:Tarefas={
        tarefaNome:this.tarefa.tarefaNome,
        descricao:this.tarefa.descricao,
        categoria:this.tarefa.categoria
      }
      this.tarefas.push(usuario);
      this.LocalStorage()
    }
    
      
    
      this.tarefa.tarefaNome="";
      this.tarefa.descricao="";
      this.tarefa.categoria="";
  }


  removerTarefa(indice):void{
    this.tarefas.splice(indice,1)
    this.LocalStorage()
  }

  LocalStorage(){
    localStorage.setItem("Lista de Tarefas",JSON.stringify(this.tarefas))
  }

  
}
