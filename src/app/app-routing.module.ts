import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogEntryComponent } from './dialog-entry/dialog-entry.component';

const routes: Routes = [
    { path: ':id/details', component: DialogEntryComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
