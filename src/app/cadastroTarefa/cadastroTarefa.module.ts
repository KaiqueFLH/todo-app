import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CadastroTarefaComponent } from "./cadastroTarefa.component";

@NgModule({
    imports:[
        CommonModule,
        FormsModule
    ],
    declarations:[CadastroTarefaComponent]
})

export class CadastroTarefaModule{

}