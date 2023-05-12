import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastroCategoriaComponent } from "src/cadastroCategoria/cadastroCategoria.component";
import { CadastroTarefaComponent } from "src/cadastroTarefa/cadastroTarefa.component";

const rotas: Routes=[
{path:'cadastrarTarefas', component:CadastroTarefaComponent},
{path:'cadastrarCategorias', component:CadastroCategoriaComponent},
{path:'',redirectTo:'cadastrarTarefas',pathMatch:'full'}

];

@NgModule({
    imports:[RouterModule.forRoot(rotas)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}