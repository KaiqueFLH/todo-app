import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.repository';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  users: User[];
  ngOnInit() {
  }
  id: string="";
  nome: string="";
  senha: string="";
  email: string="";



  constructor(private httpClient: HttpClient, private userRepository: UserRepository) {
    userRepository.getUsers().subscribe({
      next: (value) => {
        this.users = value;
      }
    });
  }


  cadastrar(): void {
    let cadastrado: boolean = true;

    const usuario: User = {
      id: this.id,
      nome: this.nome,
      senha: this.senha,
      email: this.email,
      groups: [],
      cardPermissions: [],
      propertiesPermissions: []
    }


    this.users.forEach(element => {
      if (element.id == this.id) {
        alert("Usuário já foi cadastrado. Cadastre um novo Usuário");
        this.id = "";
        this.nome = "";
        this.senha = "";
        this.email = "";
        cadastrado = false
      }

      if(this.id=="" || this.nome=="" || this.senha=="" || this.email==""){
        alert("Um Usuário não pode ser Cadastrado com Informações Faltando!")
        this.id = "";
        this.nome = "";
        this.senha = "";
        this.email = "";
        cadastrado = false
      }
    });



    if (cadastrado == true) {
      this.httpClient.post<User[]>("http://localhost:4300/usuarios", usuario)
        .subscribe((req) => {
        })
      this.id = "";
      this.nome = "";
      this.senha = "";
      this.email = "";

      alert("Usuário Cadastrado com Sucesso!");
      window.location.replace("http://localhost:4200/login")
      cadastrado = false;
    }

  }


  chamaLogin(): void {
    window.location.replace("http://localhost:4200/login")
  }

}
