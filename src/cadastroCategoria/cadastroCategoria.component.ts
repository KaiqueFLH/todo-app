import { Component } from "@angular/core";

@Component({
  selector: 'categoria-root',
  templateUrl: '../cadastroCategoria/cadastroCategoria.component.html',
  styleUrls: ['../cadastroCategoria/cadastroCategoria.component.css']
})

export class CadastroCategoriaComponent {
  ngOnInit(): void {
    if (localStorage.getItem('listaCategorias') != null) {
      this.listaCategorias = JSON.parse(localStorage.getItem('listaCategorias'));
    }

  }

  nomeCategoria: String="";
  listaCategorias: String[] = [];



  cadastrarCategoria(): void {
    console.log(this.nomeCategoria);

    if(this.nomeCategoria!=""){
      this.listaCategorias.push(this.nomeCategoria);
      localStorage.setItem('listaCategorias', JSON.stringify(this.listaCategorias));
    }
    

    this.nomeCategoria='';

  }

  removerCategoria(indice): void {
    this.listaCategorias.splice(indice, 1)
    localStorage.setItem('listaCategorias', JSON.stringify(this.listaCategorias));
  }
}