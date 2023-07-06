import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "./cookieService";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private cookieService: CookieService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const logado = this.verificaLogin();
        if (logado) {
            this.cookieService.set("Logado", "false")

            return true;
        } else {
            this.router.navigate(['/login'])
            return false;

        }


    }

    verificaLogin() {
        let isLogado = this.cookieService.get("Logado");
        let logado = isLogado === "true"

        return logado;
    }





}