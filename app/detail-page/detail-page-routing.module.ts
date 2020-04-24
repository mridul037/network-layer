import { DetailPageComponent } from './detail-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: DetailPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DetailPageRoutingModule {}
