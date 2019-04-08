import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { Store } from '@ngxs/store';
import { ResetSelectedCard } from '../actions/card.action';

@Component({
    selector: 'app-modal-container',
    template: ''
})
export class DialogEntryComponent implements OnDestroy {
    destroy = new Subject();
    currentDialog = null;

    constructor(
        private modalService: NgbModal,
        private route: ActivatedRoute,
        private router: Router, 
        private store: Store
    ) {
        route.params.pipe(takeUntil(this.destroy)).subscribe(params => {
            this.currentDialog = this.modalService.open(CardDetailsComponent, { size: 'lg' });
            this.currentDialog.componentInstance.id = params.id;
            this.currentDialog.result.then(result => {
                this.navigateBack();
            }, reason => {
                this.navigateBack();
            });
        });
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    private navigateBack(): void {
        this.store.dispatch(new ResetSelectedCard());
        this.router.navigateByUrl('/');
    }
}