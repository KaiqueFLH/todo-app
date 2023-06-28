import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.repository';
import { TesteService } from 'src/services/teste.service';

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

  ngOnInit(): void {
    if (localStorage.getItem('users') != null) {
      this.users = JSON.parse(localStorage.getItem('users'));
    }
  }

  id:string="diogo.defante";
  senha:string;
  listaUsuarios:Usuario[] =[];

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

  

}
