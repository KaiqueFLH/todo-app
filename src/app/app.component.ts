import { Component } from '@angular/core';
import { stringify } from 'querystring';

interface Tarefas{
  nome:String;
  categoria:String;
  descricao:String;
  id:number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  ngOnInit():void{
    this.tarefas = window.JSON.parse(localStorage.getItem("Lista de Tarefas"))
  }

  tarefas:Tarefas[] = [];

  tarefa:Tarefas={
    nome:null,
    categoria:null,
    descricao:null,
    id:0
  }

  cadastrarUsuario():void{
    if(this.tarefa.nome!=null && this.tarefa.categoria!=null ){
      const usuario:Tarefas={
        nome: this.tarefa.nome,
        categoria: this.tarefa.categoria,
        descricao:this.tarefa.descricao,
        id: this.tarefa.id++
      }
      this.tarefas.push(usuario);
      localStorage.setItem("Lista de Tarefas",JSON.stringify(this.tarefas))
    }
    
      this.tarefa.nome=null;
      this.tarefa.descricao=null;
      this.tarefa.categoria=null;
    
    
  }


  removerTarefa(indice):void{
    this.tarefas.splice(indice,1)
    localStorage.setItem("Lista de Tarefas",JSON.stringify(this.tarefas))
  }
}
