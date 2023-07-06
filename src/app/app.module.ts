import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserRepository } from 'src/repositories/user.repository';
import { CadastroCategoriaComponent } from 'src/cadastroCategoria/cadastroCategoria.component';
import { CadastroTarefaComponent } from 'src/cadastroTarefa/cadastroTarefa.component';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from 'src/services/auth-guard.service';
import { TesteService } from 'src/services/teste.service';
import { HeaderComponent } from '../header/header.component';
import { CadastroUsuarioComponent } from '../cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from 'src/login/login.component';
import { CookieService } from 'src/services/cookieService';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroCategoriaComponent,
    CadastroTarefaComponent,
    HeaderComponent,
    CadastroUsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    UserRepository,
    AuthGuardService,
    TesteService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
