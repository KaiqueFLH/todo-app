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
interface Categoria{
  nomeCategoria:String,
  cor:String;
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
  listaCategorias: Categoria[] = [];
  tarefaNome: String = null;
  categoria: String = null;
  categoria2:String = null;
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

    const tarefaAdd: Tarefas = {
      tarefaNome: this.tarefaNome,
      categoria: this.categoria,
      descricao: this.descricao,
      indicenovo:this.indiceNovo
    }
    console.log(tarefaAdd)

    if (this.verificaIgualdade()) {
      if (tarefaAdd.tarefaNome != '' && tarefaAdd.categoria != '') {
        this.tarefas.push(tarefaAdd);
        this.LocalStorage();

      }
    } else {
      alert('Tarefa já cadastrada!')
    }
    this.limparInput();
  }


  removerTarefa(indice): void {
    this.tarefas.splice(indice, 1)
    this.LocalStorage()
  }

  verificaIgualdade(): boolean {
    for (const i of this.tarefas) {
      if (i.tarefaNome === this.tarefaNome) {
        return false;
      }
    }
    return true;
  }

  LocalStorage() {
    localStorage.setItem("Lista de Tarefas", JSON.stringify(this.tarefas))
  }

  alterarCategoria(tarefa): void {
    tarefa.categoria = this.categoria2;
    tarefa.showCategoria = false;
    this.LocalStorage();
    this.limparInput();
  }

  limparInput(): void {
    this.tarefaNome = '';
    this.descricao=''
    this.categoria = '';
    this.categoria2 = '';
  }

  tamanhoTextArea(): void {
    for (let textarea of this.el.nativeElement.querySelectorAll("textarea")) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

  }

  dragover(categoriaD:Categoria, event:Event):void{
    event.preventDefault();
    // console.log("a")
    this.categoriaDrop = categoriaD.nomeCategoria;    
  }

  drag(tarefaD:Tarefas):void{
    this.tarefaDrop = tarefaD
    
    console.log(this.tarefaDrop)
  }


  drop(event:Event):void{
    event.preventDefault();

    this.tarefaDrop.categoria = this.categoriaDrop;

    this.ajustarPosicao();
  }

  ajustarPosicao():void{
    for (const i of this.tarefas) {
      if (i === this.tarefaDrop) {
        this.tarefas.splice(this.tarefas.indexOf(i), 1);
      }
    }
    this.tarefas.splice(this.indiceNovo, 0, this.tarefaDrop);

    this.LocalStorage();
  }

  pegaIndice(indice:number,event:Event):void{
    event.preventDefault();
    this.indiceNovo=indice;
  }

}
