import { style } from '@angular/animations';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { E } from '@angular/core/src/render3';
import { stringify } from 'querystring';

interface Tarefas {
  tarefaNome: String;
  descricao: String;
  categoria: String;
  indicenovo:number
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
  indiceNovo:number
  

  tarefa: Tarefas = {
    tarefaNome: "",
    descricao: "",
    categoria: "",
    indicenovo:0
  }

  cadastrarTarefa(): void {

    if (this.tarefa.tarefaNome != "" && this.tarefa.categoria != "") {
      const usuario: Tarefas = {
        tarefaNome: this.tarefa.tarefaNome,
        descricao: this.tarefa.descricao,
        categoria: this.tarefa.categoria,
        indicenovo:this.tarefa.indicenovo
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

  dragover(categoriaD,indice, event):void{
    event.preventDefault();
    // console.log("a")

    this.categoriaDrop = categoriaD;    
      
    
    
    
  }

  drag(tarefaD,indice,event):void{
    this.tarefaDrop = tarefaD
    
    console.log(this.tarefaDrop)
  }


  drop(categoria,indice, event):void{
    event.preventDefault();
    console.log('a');

    this.tarefaDrop.categoria = this.categoriaDrop;

    for (const i of this.tarefas) {
      if (i === this.tarefaDrop) {
        this.tarefas.splice(this.tarefas.indexOf(i), 1);
      }
    }
    this.tarefas.splice(this.indiceNovo, 0, this.tarefaDrop);

    this.LocalStorage();
  }

  pegaIndice(indice,event):void{
    event.preventDefault();
    this.indiceNovo=indice;
  }

}
