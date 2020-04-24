import { NgModule } from '@angular/core';
import { CategoryPageComponent } from './category-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: CategoryPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoryPageRoutingModule {}
