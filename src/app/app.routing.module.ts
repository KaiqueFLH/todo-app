import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastroUsuarioComponent } from "src/app/cadastro-usuario/cadastro-usuario.component";
import { CadastroCategoriaComponent } from "src/app/cadastroCategoria/cadastroCategoria.component";
import { CadastroTarefaComponent } from "src/app/cadastroTarefa/cadastroTarefa.component";
import { LoginComponent } from "src/app/login/login.component";
import { AuthGuardService } from "src/services/auth-guard.service";

const rotas: Routes=[
{path:'cadastrarTarefas', component:CadastroTarefaComponent, canActivate:[AuthGuardService]},
{path:'cadastrarCategorias', component:CadastroCategoriaComponent, canActivate: [AuthGuardService]},
{path:'login', component:LoginComponent},
{path:'cadastroUsuario', component:CadastroUsuarioComponent},
{path:'',redirectTo:'login',pathMatch:'full'}

];

@NgModule({
    imports:[RouterModule.forRoot(rotas)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}