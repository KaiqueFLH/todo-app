import { Component } from '@angular/core';

interface Tarefas{
  nome:String;
  categoria:String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  tarefa:Tarefas={
    nome:'',
    categoria:''
  }

  usuarios:Tarefas[] = [];

  cadastrarUsuario():void{
    const usuario:Tarefas={
      nome: this.tarefa.nome,
      categoria: this.tarefa.categoria
    }
   
    this.usuarios.push(usuario);
    console.log(this.usuarios)
  }


  removerTarefa():void{
    
  }
}
