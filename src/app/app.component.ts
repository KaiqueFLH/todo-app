import { Component } from '@angular/core';

interface Tarefas{
  nome:String;
  categoria:String;
  descricao:String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  tarefa:Tarefas={
    nome:'',
    categoria:'',
    descricao:''
  }

  tarefas:Tarefas[] = [];

  cadastrarUsuario():void{
    const usuario:Tarefas={
      nome: this.tarefa.nome,
      categoria: this.tarefa.categoria,
      descricao:this.tarefa.descricao
    }

    this.tarefa.nome=null;
    this.tarefa.descricao=null;
    this.tarefa.categoria=null;
   
    this.tarefas.push(usuario);
    console.log(this.tarefas)
  }


  removerTarefa(indice):void{
    this.tarefas.splice(indice,1)
  }
}
