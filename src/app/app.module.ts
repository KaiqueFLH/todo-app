import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CadastroCategoriaComponent } from 'src/cadastroCategoria/cadastroCategoria.component';
import { CadastroTarefaComponent } from 'src/cadastroTarefa/cadastroTarefa.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CadastroCategoriaComponent,
    CadastroTarefaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
