import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPageComponent } from './category-page.component';
import { MarcheAPIService } from '../@core/api/marche-api.service';
import { of } from 'rxjs';
import {
    ApplicationRouterService,
    ERouteType,
} from '../@core/application-router/application-router.service';
import { ResponseWrapper } from '../@shared/models/response-wrapper.model';
import createSpyObj = jasmine.createSpyObj;

describe('CategoryPageComponent', () => {
    let component: CategoryPageComponent;
    let fixture: ComponentFixture<CategoryPageComponent>;

    const arsSpy = createSpyObj('ApplicationRouterService', [
        'executeFunctionLink',
        'executePageLink',
        'parseLink',
    ]);
    const masSpy = createSpyObj('MarcheAPIService', ['getRequest']);

    beforeEach(async(() => {
        const providers = [
            {
                provide: MarcheAPIService,
                useFactory: () => masSpy,
            },
            {
                provide: ApplicationRouterService,
                useFactory: () => arsSpy,
            },
        ];
        TestBed.configureTestingModule({
            providers,
            declarations: [CategoryPageComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not show Heading and Tabs', () => {
        const stub = {
            text: '',
            layout: '',
            feed: [
                {
                    text: '',
                    active: true,
                    link: '',
                    items: [
                        {
                            title: {
                                text: 'Backpacks',
                            },
                            image: '',
                            link: '/lp?f=cid~1002',
                        },
                    ],
                },
            ],
        };
        const response: ResponseWrapper<object> = {
            success: true,
            data: stub,
        };
        masSpy.getRequest.withArgs('/cp', '').and.returnValue(of(response));

        component.filter = '';
        component.updateCategoryPageData();
        expect(component.data.isHeaderVisible()).toBe(false);
        expect(component.data.areTabsVisible()).toEqual(false);
        expect(component.data.getTabs().length).toEqual(0);
        expect(component.data.getItems()[0].title.getColor()).toEqual(
            '#000000'
        );
        expect(component.data.getItems()[0].title.text).toEqual('Backpacks');
    });

    it('should show tabs not heading', () => {
        const stub = {
            text: '',
            layout: '',
            feed: [
                {
                    text: '',
                    active: true,
                    link: 'Men',
                    items: [
                        {
                            title: {
                                text: 'Backpacks',
                            },
                            image: '',
                            link: '/lp?f=cid~1002',
                        },
                    ],
                },
                {
                    text: 'Women',
                    active: true,
                    link: '',
                    items: [
                        {
                            title: {
                                text: 'Backpacks',
                            },
                            image: '',
                            link: '/lp?f=cid~1002',
                        },
                    ],
                },
            ],
        };
        const response: ResponseWrapper<object> = {
            success: true,
            data: stub,
        };
        masSpy.getRequest.withArgs('/cp', '').and.returnValue(of(response));

        component.filter = '';
        component.updateCategoryPageData();
        expect(component.data.isHeaderVisible()).toBe(false);
        expect(component.data.areTabsVisible()).toEqual(true);
    });

    it('should show heading not tabs ', () => {
        const stub = {
            text: 'Tech',
            layout: '',
            feed: [
                {
                    text: 'Women',
                    active: true,
                    link: '',
                    items: [
                        {
                            title: {
                                text: 'Backpacks',
                            },
                            image: '',
                            link: '/lp?f=cid~1002',
                        },
                    ],
                },
            ],
        };
        const response: ResponseWrapper<object> = {
            success: true,
            data: stub,
        };
        masSpy.getRequest.withArgs('/cp', '').and.returnValue(of(response));

        component.filter = '';
        component.updateCategoryPageData();
        expect(component.data.isHeaderVisible()).toBe(true);
        expect(component.data.areTabsVisible()).toEqual(false);
    });

    it('should show Heading and Tabs', () => {
        const stub = {
            text: 'Backpacks',
            layout: '',
            feed: [
                {
                    text: 'Men',
                    active: false,
                    link: '',
                    items: [
                        {
                            title: {
                                text: 'Denim Backpacks',
                            },
                            image: '',
                            link: '/lp?f=cid~1002,g~m',
                        },
                    ],
                },
                {
                    text: 'Women',
                    active: true,
                    link: '',
                    items: [
                        {
                            title: {
                                text: 'Floral Backpacks',
                            },
                            image: '',
                            link: '/lp?f=cid~1002,g~f',
                        },
                    ],
                },
            ],
        };

        const response: ResponseWrapper<object> = {
            success: true,
            data: stub,
        };
        masSpy.getRequest
            .withArgs('/cp', 'cid~1002')
            .and.returnValue(of(response));

        component.filter = 'cid~1002';
        component.updateCategoryPageData();
        expect(component.data.isHeaderVisible()).toBe(true);
        expect(component.data.areTabsVisible()).toEqual(true);
        expect(component.data.getTabs()[0].text).toEqual('Men');
        expect(component.data.getTabs()[1].text).toEqual('Women');
        expect(component.data.getItems()[0].title.text).toEqual(
            'Floral Backpacks'
        );
    });

    it('should route to page on link', () => {
        arsSpy.parseLink.and.returnValue({
            id: 'lp',
            query: 'cid~1002',
            type: ERouteType.page,
        });

        const testLink1 = '/lp?f=cid~1002';
        component.processLink(testLink1);
        expect(arsSpy.parseLink).toHaveBeenCalledWith('/lp?f=cid~1002');
        expect(arsSpy.executePageLink).toHaveBeenCalledWith('lp', 'cid~1002');
    });
});
