import { style } from '@angular/animations';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { stringify } from 'querystring';

interface Tarefas {
  tarefaNome: String;
  descricao: String;
  categoria: String;
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

  constructor(private renderer: Renderer2, private el: ElementRef) { }


  tarefas: Tarefas[] = [];
  listaCategorias: String[] = [];
  tarefaNome: String = null;
  categoria: String = null;
  descricao: String = null;
  tarefaDrop: Tarefas;
  categoriaDrop:String;


  tarefa: Tarefas = {
    tarefaNome: "",
    descricao: "",
    categoria: ""
  }

  cadastrarTarefa(): void {

    if (this.tarefa.tarefaNome != "" && this.tarefa.categoria != "") {
      const usuario: Tarefas = {
        tarefaNome: this.tarefa.tarefaNome,
        descricao: this.tarefa.descricao,
        categoria: this.tarefa.categoria
      }
      this.tarefas.push(usuario);
      this.LocalStorage()
    }



    this.tarefa.tarefaNome = "";
    this.tarefa.descricao = "";
    this.tarefa.categoria = "";
  }


  removerTarefa(indice): void {
    this.tarefas.splice(indice, 1)
    this.LocalStorage()
  }

  LocalStorage() {
    localStorage.setItem("Lista de Tarefas", JSON.stringify(this.tarefas))
  }

  tamanhoTextArea(): void {
    for (let textarea of this.el.nativeElement.querySelectorAll("textarea")) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

  }

  allowDrop(categoriaD):void{
    console.log("a")
    this.tarefaDrop.categoria = categoriaD;
    this.LocalStorage();
  }

  drop(tarefaD):void{
    
    this.tarefaDrop = tarefaD
    console.log(this.tarefaDrop)
  }

  


  


}
