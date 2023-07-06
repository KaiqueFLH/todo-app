import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/services/cookieService';
import { User } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.repository';
import { TesteService } from 'src/services/teste.service';
import { Router } from '@angular/router';

interface Usuario{
  id: string,
  senha: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nome: string;
  email: string;

  ngOnInit(): void {
    if (this.cookieService.get('Logado') != null) {
      this.users = JSON.parse(localStorage.getItem('Logado'));
    }
  }

  id:string;
  senha:string;
  listaUsuarios:Usuario[] =[];

  userId="diogo.defante"
  users:User[]=[];
  user!: User;

  constructor(
    private userRepository: UserRepository,
    private testeService: TesteService,
    private httpClient:HttpClient,
    private cookieService:CookieService,
    private router: Router
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

  fazerLogin():void{

    this.users.forEach(element => {
      if(element.id == this.id && element.senha==this.senha){
        this.router.navigate(['/cadastrarTarefas'])
      }
    });

    this.cookieService.set("Logado","true")
    // console.log(this.getCookie("Logado")); 
  }

  chamaCadastro():void{
    window.location.replace("http://localhost:4200/cadastroUsuario")
  }

  

}
