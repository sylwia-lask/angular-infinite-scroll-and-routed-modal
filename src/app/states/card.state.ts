import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';

import { Card } from '../models/card.interface';
import { GetCards, ResetSelectedCard, SetSelectedCardByValue, SetSelectedCardById, SetRelatedCards } from '../actions/card.action';
import { CardsService } from '../cards.service';
import { of } from 'rxjs';

export class CardStateModel {
    cards: Card[];
    selectedCard: Card;
    totalCardsCount: number;
}

@State<CardStateModel>({
    name: 'cards',
    defaults: {
        cards: [],
        selectedCard: null,
        totalCardsCount: null
    }
})
export class CardState {
    constructor(private cardsService: CardsService) {

    }

    @Selector()
    static getCardsList(state: CardStateModel) {
        return state.cards;
    }

    @Selector()
    static getSelectedCard(state: CardStateModel) {
        return state.selectedCard;
    }

    @Action(GetCards)
    getCards({ getState, setState }: StateContext<CardStateModel>, { pageSize, page, optionalParameter, optionalValue }: GetCards) {
        return this.cardsService.getCards(pageSize, page, optionalParameter, optionalValue).pipe(tap((result) => {
            const state = getState();
            let newCardsArray = state.cards.concat(result.body.cards);
            if (state.cards.length || page === 1) { // remove duplicates
                newCardsArray = newCardsArray.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj.id).indexOf(obj.id) === pos;
                });
            }
            setState({
                ...state,
                cards: newCardsArray,
                totalCardsCount: Number(result.headers.get('total-count'))
            });
        }),
            catchError(error => {
                console.log('get cards API error');
                return of(null);
            }));
    }

    @Action(SetSelectedCardByValue)
    setSelectedCardByValue(ctx: StateContext<CardStateModel>, { card }: SetSelectedCardByValue) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            selectedCard: card
        })
        return ctx.dispatch(new SetRelatedCards(card));
    }

    @Action(SetSelectedCardById)
    setSelectedCardById(ctx: StateContext<CardStateModel>, { id }: SetSelectedCardById) {
        return this.cardsService.getSingleCard(id).pipe(tap((result) => {
            return ctx.dispatch(new SetRelatedCards(result.card));
        }),
            catchError(error => {
                console.log('get single card API error');
                return of(null);
            }));
    }

    @Action(SetRelatedCards)
    SetRelatedCards(ctx: StateContext<CardStateModel>, { card }: SetRelatedCards) {
        return this.cardsService.getRelatedCards(card.types, card.rarity, card.hp, card.id).pipe(
            tap((result) => {
                const state = ctx.getState();
                const selectedCard = card;
                selectedCard.relatedCards = result;
                ctx.setState({
                    ...state,
                    selectedCard
                });
            }),
            catchError(error => {
                console.log('get related cards API error');
                return of(null);
            })
        );
    }

    @Action(ResetSelectedCard)
    ResetSelectedCard(ctx: StateContext<CardStateModel>, { }: ResetSelectedCard) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            selectedCard: null
        })
    }
}
