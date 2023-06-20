import { Component } from "@angular/core";

interface Propriedade{
  nome: String,
  tipo:String,
  conteudo:String[] | number | String;
}

@Component({
  selector: 'propriedade-root',
  templateUrl: '../cadastroCategoria/cadastroCategoria.component.html',
  styleUrls: ['../cadastroCategoria/cadastroCategoria.component.css']
})

export class CadastroCategoriaComponent {
  
  ngOnInit(): void {
    if (localStorage.getItem('listaProps') != null) {
      this.listaProps = JSON.parse(localStorage.getItem('listaProps'));
    }
  }

  nome: String;
  tipo:String;
  conteudo:String[] | number | String;
  listaProps: Propriedade[] = [];
  listaTipos: String[] = ["Texto", "Número", "Seleção"]


  teste = false;

  tornaTrue(): void {

    if (!this.teste) {
      this.teste = true;

    } else {
      this.teste = false;
    }
  }



  // verificarIgualdade(): boolean {

  //   for (const i of this.listaProps) {
  //     if (i.nome === this.listaProps) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }

  contraste(cor: string): string {
    const r = parseInt(String(cor).substr(1, 2), 16);
    const g = parseInt(String(cor).substr(3, 2), 16);
    const b = parseInt(String(cor).substr(5, 2), 16);
    const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luz > 128 ? '#000' : '#fff'
  }


  cadastrarPropriedade():void{
    const prop:Propriedade = {
      nome:this.nome,
      tipo:this.tipo,
      conteudo:this.conteudo
    }

    this.listaProps.push(prop);
    console.log(prop.tipo);
    

    this.localStorage();

  }

  removerPropriedade(indice):void{
    this.listaProps.splice(indice,1);
    this.localStorage();
  }

  localStorage():void{
    return localStorage.setItem("listaProps", JSON.stringify(this.listaProps));
  }










  // cadastrarCategoria(): void {
  //   console.log(this.nomeCategoria);

  //   const categoria: Categoria = {
  //     nomeCategoria: this.nomeCategoria,
  //     cor: this.cor
  //   }

  //   if (this.nomeCategoria != "") {
      
  //     if (this.verificarIgualdade()) {
  //       this.listaCategorias.push(categoria);
        
  //       localStorage.setItem('listaCategorias', JSON.stringify(this.listaCategorias));
  //     }
  //     else {
  //       alert("A Categoria que você está tentando cadastrar, já existe!")
  //     }
  //   }

  //   this.nomeCategoria = '';

  // }

  // removerCategoria(indice): void {
  //   let listaTarefas = []
  //   if (localStorage.getItem('Lista de Tarefas') != null) {
  //     listaTarefas = JSON.parse(localStorage.getItem('Lista de Tarefas'));
  //   }
    
  //   for (let tarefa of listaTarefas) {
  //     console.log('a');
  //     if (tarefa.categoria == this.listaCategorias[indice]) {

  //       listaTarefas.splice(listaTarefas.indexOf(tarefa), listaTarefas.length)
  //     }
  //   }

  //   localStorage.setItem('Lista de Tarefas', JSON.stringify(listaTarefas))

  //   this.listaCategorias.splice(indice, 1)
  //   localStorage.setItem('listaCategorias', JSON.stringify(this.listaCategorias));

  // }
}