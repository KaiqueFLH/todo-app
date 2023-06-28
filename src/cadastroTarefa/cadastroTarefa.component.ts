import { style } from '@angular/animations';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { E } from '@angular/core/src/render3';
import { stringify } from 'querystring';
import { User } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.repository';
import { TesteService } from 'src/services/teste.service';

interface Tarefas {
  tarefaNome: String,
  conteudoTar: String | number,
  indicenovo: number
}
interface Propriedade {
  nome: String,
  tipo: String,
  conteudo: String | number,
  inputAdd?: boolean;
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
    if (localStorage.getItem('listaProps') != null) {
      this.listaProps = JSON.parse(localStorage.getItem('listaProps'));
    }

  }
  
  userId="diogo.defante"
  users:User[]=[];
  user!: User;

  constructor(
    private userRepository: UserRepository,
    private testeService: TesteService,
    private el: ElementRef
  ) {
    userRepository.getUsers().subscribe({
      next: (value) => {
        this.users=value;
        this.user=this.getUsuarioLogado();
      }
    });
  }


  tarefas: Tarefas[] = [];
  listaProps: Propriedade[] = [];
  valor: string | number;
  tarefaNome: String = null;
  prop: Propriedade = null;
  prop2: String = null;
  descricao: String = null;
  tarefaDrop: Tarefas;
  propriedadeDrop: String;
  conteudoTar: String | number;
  indiceNovo: number

  nome: String = "";
  tipo: String = "";
  conteudo: String | number = null;
  inputAdd: boolean = false;
  conteudoInsert: String;
  listaTipos: String[] = ["Texto", "Número", "Seleção"]


  tarefa: Tarefas = {
    tarefaNome: "",
    conteudoTar: null,
    indicenovo: 0
  }

  propriedade: Propriedade = {
    nome: this.nome,
    tipo: this.tipo,
    conteudo: this.conteudo
  }

  teste = false;

  aparecer(): void {

    if (!this.teste) {
      this.teste = true;

    } else {
      this.teste = false;
    }
  }

  cadastrarTarefa(): void {

    if (this.hasPermission('Add')) {
      alert('Pode cadastrar');
      const tarefaAdd: Tarefas = {
        tarefaNome: this.tarefaNome,
        conteudoTar: this.conteudo,
        indicenovo: this.indiceNovo
      }
      console.log(tarefaAdd)


      this.tarefas.push(tarefaAdd);
      this.LocalStorage();
      this.limparInput();
      return;
    }

    alert('Não Pode cadastrar');

  }

  editarTarefa(): void {
    if (!this.hasPermission('Edit')) {
      alert('Não pode cadastrar');
      return;
    }
    alert('Pode cadastrar');
  }


  hasPermission(permission: string): boolean {
    if (User === undefined) {
      return this.user.cardPermissions.some((cardPermission) =>
        cardPermission === permission
      );
    }

    return false;

  }


  removerTarefa(indice): void {

    if (this.hasPermission('Remove')) {
      alert('Pode cadastrar');
      this.tarefas.splice(indice, 1)
      this.LocalStorage()
      return;
    }
    alert('Não Pode cadastrar');

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

  alterarPropriedade(tarefa): void {
    tarefa.prop = this.prop2;
    tarefa.showProp = false;
    this.LocalStorage();
    this.limparInput();
  }

  limparInput(): void {
    this.tarefaNome = '';
    this.descricao = ''
    this.prop = null;
    this.prop2 = '';
  }

  tamanhoTextArea(): void {
    for (let textarea of this.el.nativeElement.querySelectorAll("textarea")) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

  }

  contraste(cor: string): string {
    const r = parseInt(String(cor).substr(1, 2), 16);
    const g = parseInt(String(cor).substr(3, 2), 16);
    const b = parseInt(String(cor).substr(5, 2), 16);
    const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luz > 128 ? '#000' : '#fff'
  }

  dragover(propD: Propriedade, event: Event): void {
    event.preventDefault();
    // console.log("a")
    this.propriedadeDrop = propD.nome;
  }

  drag(tarefaD: Tarefas): void {
    this.tarefaDrop = tarefaD

    console.log(this.tarefaDrop)
  }


  drop(event: Event): void {
    event.preventDefault();

    this.tarefaDrop.tarefaNome = this.propriedadeDrop;

    this.ajustarPosicao();
  }

  ajustarPosicao(): void {
    this.tarefas.splice(this.tarefas.indexOf(this.tarefaDrop), 1);
    this.tarefas.splice(this.indiceNovo, 0, this.tarefaDrop);

    this.LocalStorage();
  }

  pegaIndice(indice: number, event: Event): void {
    event.preventDefault();
    this.indiceNovo = indice;
  }

  private getUsuarioLogado(): User {
    return this.users.find((user) => {
      return user.id === this.userId
    }) as User;
  }

}
