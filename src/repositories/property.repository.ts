import { Injectable } from "@angular/core";
 import { PropertiesPermissions } from "src/models/propertyPermission";
import{HttpClient}from '@angular/common/http';
 import { Observable } from "rxjs";
 import {map} from "rxjs/operators";

 const API_URL="http://localhost:4300/propertyPermission"

 @Injectable()
 export class PropertiesRepository {
    constructor(private httpClient: HttpClient){    

    }

     public getProperties():Observable< PropertiesPermissions[]> {
         return this.httpClient.get<PropertiesPermissions[]>(API_URL).pipe(map(values=>{
            const propriedades: PropertiesPermissions[]=[];
            for(const value of values){
                propriedades.push(Object.assign(new PropertiesPermissions(),value))
            }
           return propriedades;
        }));
    }

}