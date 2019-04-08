import { Component, OnInit, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { CardState } from '../states/card.state';
import { SetSelectedCardById } from '../actions/card.action';
import { Card } from '../models/card.interface';

@Component({
    selector: 'app-card-details',
    templateUrl: './card-details.component.html',
    styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
    @Input() id: string;
    @Select(CardState.getSelectedCard) card$: Observable<Card>;

    constructor(private store: Store, private modalService: NgbModal) { }

    ngOnInit(): void {
        const isCardSelected = this.store.snapshot().cards.selectedCard;
        if (!isCardSelected) {
            this.store.dispatch(new SetSelectedCardById(this.id));
        }
    }

    closeModal(): void {
        this.modalService.dismissAll();
    }
}
