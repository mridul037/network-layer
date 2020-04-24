import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPageComponent } from './category-page.component';
import { CategoryPageRoutingModule } from './category-page-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [CategoryPageComponent],
    imports: [
        CommonModule,
        CategoryPageRoutingModule,
        MatTabsModule,
        FlexLayoutModule,
    ],
})
export class CategoryPageModule {
    constructor() {}
}
