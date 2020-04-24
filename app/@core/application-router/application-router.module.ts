import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRouterService } from './application-router.service';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/cp',
        pathMatch: 'full',
    },
    {
        path: 'cp',
        loadChildren: () =>
            import('../../category-page/category-page.module').then(
                m => m.CategoryPageModule
            ),
    },
];

@NgModule({
    providers: [ApplicationRouterService],
    declarations: [],
    imports: [
        RouterModule.forRoot(appRoutes, {
            enableTracing: true,
            initialNavigation: true,
            urlUpdateStrategy: 'eager',
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class ApplicationRouterModule {}
