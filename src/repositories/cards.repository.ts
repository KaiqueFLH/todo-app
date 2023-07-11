import { Injectable } from "@angular/core";
import { users } from '../data/users';
import { CardsPermissions } from "src/models/cardsPermission";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

const API_URL = 'http://localhost:4300/cardPermission';

@Injectable()
export class CardsRepository {

    constructor(
        private httpClient: HttpClient
    ) { }

    getCards(): Observable<CardsPermissions[]> {
        return this.httpClient.get<CardsPermissions[]>(API_URL)
            .pipe(
                map(values => {
                    const cards: CardsPermissions[] = [];
                    for (const value of values) {
                        cards.push(Object.assign(new CardsPermissions(), value));
                    }
                    return cards;
                }))
    }

}
