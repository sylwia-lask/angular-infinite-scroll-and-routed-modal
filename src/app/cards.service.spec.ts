import { CardsService } from './cards.service';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_ADDRESS } from './shared';

describe('CoursesService', () => {
    let httpTestingController: HttpTestingController;
    let service: CardsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CardsService],
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(CardsService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getAllCardsRequest', () => {
        it('returned Observable should match the right data', () => {
            const mockApiResponse = {
                cards: [
                    {
                        name: 'Picatchu',
                        supertype: 'Pokemon',
                        subtype: 'Pok'
                    },
                    {
                        name: 'Snorlax',
                        supertype: 'Pok',
                        subtype: 'Sleepy'
                    }
                ]
            };

            service.getCards(20, 1)
                .subscribe(response => {
                    expect(response.body.cards[0].name).toEqual('Picatchu');
                    expect(response.body.cards[0].supertype).toEqual('Pokemon');
                    expect(response.body.cards[0].subtype).toEqual('Pok');
                });

            const req = httpTestingController.expectOne(
                `${API_ADDRESS}cards?pageSize=20&page=1`
            );

            req.flush(mockApiResponse);
        });
    });

    describe('getCardRequest', () => {
        it('returned Observable should match the right data', () => {
            const mockApiResponse = {
                card:
                {
                    name: 'Snorlax',
                    supertype: 'Pok',
                    subtype: 'Sleepy'
                }
            };

            service.getSingleCard('1234')
                .subscribe(response => {
                    expect(response.card.name).toEqual('Snorlax');
                    expect(response.card.supertype).toEqual('Pok');
                    expect(response.card.subtype).toEqual('Sleepy');
                });

            const req = httpTestingController.expectOne(
                `${API_ADDRESS}cards/1234`
            );

            req.flush(mockApiResponse);
        });
    });
});
