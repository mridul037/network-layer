import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MarcheAPIService } from '../@core/api/marche-api.service';
import { CPData } from './category-page.data';
import { Subscriber } from 'rxjs';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { ErrorWrapper, ResponseWrapper } from '../@shared/models/response-wrapper.model';
import { RouteExecutionInterface } from '../@core/application-router/route-execution.interface';
import { ApplicationRouterService, ERouteType } from '../@core/application-router/application-router.service';

@Component({
    selector: 'app-category-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.css'],
})
export class CategoryPageComponent
    implements OnInit, OnChanges, RouteExecutionInterface {
    static readonly CP_DATA_API = '/cp';

    @Input() filter: string;

    data: CPData = new CPData();
    errors: ErrorWrapper[] = [];

    constructor(
        private marcheAPIService: MarcheAPIService,
        private applicationRouterService: ApplicationRouterService
    ) {}

    ngOnInit(): void {
        this.updateCategoryPageData();
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.filter.currentValue !== changes.filter.previousValue) {
            this.updateCategoryPageData();
        }
    }

    updateCategoryPageData() {
        const subscriber = Subscriber.create<ResponseWrapper<CPData>>(
            value => {
                if (value.success) {
                    plainToClassFromExist(this.data, value.data);
                } else {
                    this.errors = plainToClass(ErrorWrapper, value.errors);
                }
            },
            error => {},
            () => {}
        );

        this.marcheAPIService
            .getRequest<ResponseWrapper<CPData>>(
                CategoryPageComponent.CP_DATA_API,
                this.filter
            )
            .subscribe(subscriber);
    }

    executeFunctionLink(id: string, query: string) {
        this.applicationRouterService.executeFunctionLink(id, query);
    }

    executePageLink(pageId: string, query: string) {
        this.applicationRouterService.executePageLink(pageId, query);
    }

    processLink(link: string) {
        const routeParse = this.applicationRouterService.parseLink(link);
        switch (routeParse.type) {
            case ERouteType.function:
                this.executeFunctionLink(routeParse.id, routeParse.query);
                break;
            case ERouteType.page:
                this.executePageLink(routeParse.id, routeParse.query);
                break;
        }
    }
}
