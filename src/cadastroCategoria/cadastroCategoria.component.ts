import { Component } from "@angular/core";
import { User } from "src/models/users/user";
import { UserRepository } from "src/repositories/user.repository";
import { TesteService } from "src/services/teste.service";


interface Propriedade {
  nome: String,
  tipo: String,
  conteudo?: String[],
  inputAdd?: boolean;
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

  nome: String = "";
  tipo: String;
  conteudo: String[];
  inputAdd: boolean = false;
  conteudoInsert: String;
  listaProps: Propriedade[] = [];
  listaTipos: String[] = ["Texto", "Número", "Seleção"]

  
  userId="diogo.defante"
  users:User[]=[];
  user!: User;

  constructor(
    private userRepository: UserRepository,
    private testeService: TesteService,
  ) {
    userRepository.getUsers().subscribe({
      next: (value) => {
        this.users=value;
        this.user=this.getUsuarioLogado();
      }
    });
  }

  private getUsuarioLogado(): User {
    return this.users.find((user) => {
      return user.id === this.userId
    }) as User;
  }

  hasPermission(permission: string): boolean {
    if(User==undefined){
      return this.user.cardPermissions.some((cardPermission) => 
        cardPermission === permission);
    }
      return false;

  }
  // getUsuarioLogado(): User {
  //   return this.users.find((user) => {
  //     return user.id === this.userId
  //   }) as User;
  // }

  tornaTrue(prop): void {

    if (!prop.inputAdd) {
      prop.inputAdd = true;

    } else {
      prop.inputAdd = false;
    }
  }



  verificarIgualdadeNome(): String {

    for (const i of this.listaProps) {
      if (i.nome === this.nome) {
        return i.nome;
      }
    }
  }

  verificarIgualdadeTipo(): String {

    for (const i of this.listaProps) {
      if (i.tipo === this.tipo) {
        return i.tipo;
      }
    }
  }

  contraste(cor: string): string {
    const r = parseInt(String(cor).substr(1, 2), 16);
    const g = parseInt(String(cor).substr(3, 2), 16);
    const b = parseInt(String(cor).substr(5, 2), 16);
    const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luz > 128 ? '#000' : '#fff'
  }


  cadastrarPropriedade(): void {
    if (this.hasPermission("Add")) {
      alert("Pode Cadastrar.")

      let prop: Propriedade

      if (this.tipo == "Seleção") {
        prop = {
          nome: this.nome,
          tipo: this.tipo,
          conteudo: [],
          inputAdd: false
        }

      }
      else {
        prop = {
          nome: this.nome,
          tipo: this.tipo
        }
      }

      if (this.nome != "") {
        if ((this.verificarIgualdadeNome() == prop.nome && this.verificarIgualdadeTipo() != prop.tipo) ||
          this.verificarIgualdadeNome() != prop.nome) {

          this.listaProps.push(prop);
          this.localStorage();
        }
        else {
          alert("Você está tentando cadastrar uma Propriedade já existente.")
        }
      }
      this.nome = ""
      this.tipo = ""

      return;
    }
      alert("Não Pode Cadastrar.")
  }

  editarTarefa(): void {
    if (!this.hasPermission('Edit')) {
      alert('Não pode cadastrar');
      return;
    }
    alert('Pode cadastrar');
  }

  cadastrarConteudoInsert(prop: Propriedade): void {
    console.log(prop.conteudo)
    if (Array.isArray(prop.conteudo)) {
      prop.conteudo.push(this.conteudoInsert);
      this.conteudoInsert = '';
    }

    this.localStorage();
  }

  removerPropriedade(indice): void {
    if(this.hasPermission("Remove")){
      alert("Pode Remover.")

      this.listaProps.splice(indice, 1);
      this.localStorage();

      return;
    }alert("Não Pode Remover.")
    
  }

  removerConteudoInsert(conteudoInsert: string, prop: Propriedade): void {
    prop.conteudo.splice(prop.conteudo.indexOf(conteudoInsert), 1);
    this.conteudoInsert = '';

    this.localStorage();
  }

  localStorage(): void {
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