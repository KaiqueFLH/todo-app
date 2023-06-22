import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserRepository } from 'src/repositories/user.repository';
import { LoginComponent } from '../login/login.component';
import { CadastroCategoriaComponent } from 'src/cadastroCategoria/cadastroCategoria.component';
import { CadastroTarefaComponent } from 'src/cadastroTarefa/cadastroTarefa.component';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroCategoriaComponent,
    CadastroTarefaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
