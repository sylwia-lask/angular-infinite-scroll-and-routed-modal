import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { CardResponseModel, CardsResponseModel } from './models';
import { Card } from './models/card.interface';
import { API_ADDRESS } from './shared';

type RelatedPossibility = {
    propName: string;
    value: string;
}

@Injectable({
    providedIn: 'root'
})
export class CardsService {

    constructor(private http: HttpClient) { }

    getCards(pageSize: number = 1, page: number = 1, optionalParameter?: string, optionalValue?: string):
        Observable<HttpResponse<CardsResponseModel>> {
        const optionalQuery = (param, value) => {
            if (param && value) {
                return `&${optionalParameter}=${optionalValue}`;
            }
            return '';
        };
        return this.http.get<CardsResponseModel>
            (`${API_ADDRESS}cards?pageSize=${pageSize}&page=${page}${optionalQuery(optionalParameter, optionalValue)}`,
                { observe: 'response' });
    }

    getSingleCard(id: string): Observable<CardResponseModel> {
        return this.http.get<CardResponseModel>(`${API_ADDRESS}cards/${id}`);
    }

    getRelatedCards(types: string[] | undefined, rarity: string | undefined, hp: string | undefined, id: string) {
        const relatedArrayLength = 3;
        const pageSize = relatedArrayLength + 1;
        const page = 1;

        let singleType;
        if (types) {
            singleType = types[0];
        }

        let relatedPossibilitiesArray: RelatedPossibility[] = [
            {
                propName: 'type',
                value: singleType
            },
            {
                propName: 'rarity',
                value: rarity
            },
            {
                propName: 'hp',
                value: hp
            }];

        relatedPossibilitiesArray = relatedPossibilitiesArray.filter(el => el.value !== undefined)
            .filter(e => !(e.propName === 'hp' && isNaN(Number(e.value))));

        if (!relatedPossibilitiesArray.length) {
            return of([]);
        }

        const relatedCardsCallsArray = relatedPossibilitiesArray.map(e => this.getCards(pageSize, page, e.propName, e.value));

        const relatedArray$ = forkJoin(...relatedCardsCallsArray).pipe(
            map(response => {
                const collectionsArray = response.map(el => el.body.cards);
                const pickedItems = [];
                while (pickedItems.length < relatedArrayLength) {
                    collectionsArray.forEach(el => {
                        const element = this.getElementFromCollection(el, pickedItems, id);
                        el.shift();
                        if (element) {
                            pickedItems.push(element);
                        }
                    });
                }
                pickedItems.splice(3);
                return pickedItems;
            })
        );

        return relatedArray$;
    }

    private getElementFromCollection(collection: Card[], selectedItemsArray: Card[], id: string): Card {
        if (!collection.length) {
            return null;
        }
        const chosenElement = collection[0];

        if (chosenElement.id !== id && selectedItemsArray.every(el => el.id !== chosenElement.id)) {
            return chosenElement;
        }
        return null;
    }
}
