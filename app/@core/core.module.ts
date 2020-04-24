import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MarcheAPIService } from './api/marche-api.service';
import { ApplicationRouterModule } from './application-router/application-router.module';

@NgModule({
    providers: [MarcheAPIService],
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    exports: [ApplicationRouterModule],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                `${parentModule} has already been loaded. Import Core module in the AppModule only.`
            );
        }
    }
}
