import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastroUsuarioComponent } from "src/cadastro-usuario/cadastro-usuario.component";
import { CadastroCategoriaComponent } from "src/cadastroCategoria/cadastroCategoria.component";
import { CadastroTarefaComponent } from "src/cadastroTarefa/cadastroTarefa.component";
import { LoginComponent } from "src/login/login.component";

const rotas: Routes=[
{path:'cadastrarTarefas', component:CadastroTarefaComponent},
{path:'cadastrarCategorias', component:CadastroCategoriaComponent},
{path:'login', component:LoginComponent},
{path:'cadastroUsuario', component:CadastroUsuarioComponent},
{path:'',redirectTo:'cadastroUsuario',pathMatch:'full'}

];

@NgModule({
    imports:[RouterModule.forRoot(rotas)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}