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
  tarefaNome:String;
  categoria:String;
  descricao:String;
  

  tarefa:Tarefas={
    tarefaNome:"",
    descricao:"",
    categoria:""
  }

  cadastrarTarefa():void{

    if(this.tarefaNome!="" && this.categoria!=""){
      const usuario:Tarefas={
        tarefaNome:this.tarefa.tarefaNome,
        categoria:this.tarefa.categoria,
        descricao:this.tarefa.descricao
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
