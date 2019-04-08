import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { CardState } from '../states/card.state';
import { Card } from '../models/card.interface';
import { GetCards, SetSelectedCardByValue } from '../actions/card.action';

@Component({
    selector: 'app-cards-list',
    templateUrl: './cards-list.component.html',
    styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements AfterViewInit, OnDestroy {
    totalItemsCount: number;
    pageSize = 20;
    page = 1;
    loading = true;
    cardsLength: number;
    @Select(CardState.getCardsList) cards$: Observable<Card[]>;

    private subscriptions: Subscription[] = [];

    constructor(private store: Store) {

    }

    ngAfterViewInit(): void {
        this.subscriptions.push(this.store.dispatch(new GetCards(this.pageSize, this.page)).subscribe(() => {
            this.loading = false;
            this.pageSize = 70;
            this.totalItemsCount = this.store.snapshot().cards.totalCardsCount;
            this.cardsLength = this.store.snapshot().cards.cards.length;
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    onScroll() {
        if (this.cardsLength < this.totalItemsCount) {
            this.loading = true;
            this.subscriptions.push(this.store.dispatch(new GetCards(this.pageSize, this.page)).subscribe(() => {
                this.loading = false;
                this.page++;
                this.cardsLength = this.store.snapshot().cards.cards.length;
            }));
        }
    }

    setSelectedCard(card: Card) {
        this.store.dispatch(new SetSelectedCardByValue(card));
    }
}
