import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsListItemComponent } from './cards-list-item.component';
import { Card } from '../models';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PokemonsListItemComponent', () => {
    let component: CardsListItemComponent;
    let fixture: ComponentFixture<CardsListItemComponent>;
    let titleEl: DebugElement;
    let superType: DebugElement;
    let image: DebugElement;

    const card: Card = {
        name: 'Pikacz', 
        supertype: 'Pokemon', 
        imageUrl: 'https://img.jpg'
    } as Card;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CardsListItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardsListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        component.card = null;

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show name, image and supertype when has the card value', () => {
        component.card = card;
        fixture.detectChanges();
        titleEl = fixture.debugElement.query(By.css('.card-title'));
        superType = fixture.debugElement.query(By.css('.card-text'));
        image = fixture.debugElement.query(By.css('.card-img-top'));
        expect(titleEl.nativeElement.textContent).toBe('Pikacz');
        expect(superType.nativeElement.textContent).toBe('Pokemon');
        expect(image.nativeElement.src).toBe('https://img.jpg/');
    });
});
