import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppRoutingModule } from './app-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CardsListComponent } from './cards-list/cards-list.component';
import { CardsListItemComponent } from './cards-list-item/cards-list-item.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { DialogEntryComponent } from './dialog-entry/dialog-entry.component';
import { CardState } from './states/card.state';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        CardsListComponent,
        CardsListItemComponent,
        CardDetailsComponent,
        DialogEntryComponent
    ],
    imports: [
        BrowserModule,
        NgxsModule.forRoot([CardState]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        InfiniteScrollModule,
        NgbModule,
        NgbModalModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [CardDetailsComponent]
})
export class AppModule { }
