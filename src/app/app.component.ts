import { Component } from '@angular/core';
import { User } from 'src/models/users/user';
import { TesteService } from 'src/services/teste.service';
import { UserRepository } from 'src/repositories/user.repository';
import { CardsPermissions } from 'src/models/cardsPermission';
import { CardsRepository } from 'src/repositories/cards.repository';
import { PropertiesRepository } from 'src/repositories/property.repository';


interface Usuario{
  id: string;
	name: string;
	groups: string[];
	cardPermissions: string[];
	propertiesPermissions: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teste-app';

  private userId: string = 'jonas';
  private users: User[] = [];
  user!: User;

  constructor(
    private userRepository: UserRepository,
    private testeService: TesteService,
    private cardsRepository:CardsRepository,
    private propertyRepository:PropertiesRepository
  ) {
    userRepository.getUsers().subscribe({
      next: (value) =>{
        console.log(value)
      }
    });

    cardsRepository.getCards().subscribe({
      next: (value) =>{
        const listaBoila:CardsPermissions[] = value
        console.log(value)
      }
    });

    propertyRepository.getProperties().subscribe({
      next: (value) =>{
        console.log(value)
      }
    });

    testeService.getTema().subscribe({
      next: (tema) => {
        console.log(tema);
      }
    })
  }

  adicionarTarefa(): void {
    if (!this.hasPermission('Add')) {
      alert('Não pode cadastrar');
      return;
    }
    alert('Pode cadastrar');
  }

  editarTarefa(): void {
    if (!this.hasPermission('Edit')) {
      alert('Não pode cadastrar');
      return;
    }
    alert('Pode cadastrar');
  }

  removerTarefa(): void {
    if (!this.hasPermission('Remove')) {
      alert('Não pode cadastrar');
      return;
    }
    alert('Pode cadastrar');
  }

  hasPermission(permission: string): boolean {
    return this.user.cardPermissions.some((cardPermission) => {
      return cardPermission === permission;
    });
  }

  private getUsuarioLogado(): User {
    return this.users.find((user) => {
      return user.id === this.userId
    }) as User;
  }

}
