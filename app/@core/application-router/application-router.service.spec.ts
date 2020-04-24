import { TestBed } from '@angular/core/testing';

import { ApplicationRouterService } from './application-router.service';
import { Router } from '@angular/router';
import createSpyObj = jasmine.createSpyObj;

describe('ApplicationRouterService', () => {
    let service: ApplicationRouterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Router,
                    useFactory: () => createSpyObj('Router', ['navigateByUrl']),
                },
            ],
        });
        service = TestBed.inject(ApplicationRouterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    [
        ['/lp?f=cid~1002', 'lp', 'cid~1002'],
        [
            '/ranDOMseo/dsd/cNBn-tent/random/content/loi-plough/lp?f=id~ta_pc,g~m,st~holo',
            'lp',
            'id~ta_pc,g~m,st~holo',
        ],
        ['/lp?f=id~ta', 'lp', 'id~ta'],
        ['/lp', 'lp', ''],
        ['/lp?utm_source=kensio', 'lp', ''],
        ['/lp?utm_source=kensio&utm_campaign=ref&f=', 'lp', ''],
        ['/lp?utm_source=kensio&utm_campaign=ref&f=id~ta', 'lp', 'id~ta'],
        [
            '/lp?f=id~ta_pc,g~m,st~holo&utm_id=yuklohome',
            'lp',
            'id~ta_pc,g~m,st~holo',
        ],
    ].forEach(([link, pid, query]: string[]) => {
        it(`PAGE LINK : should return ${pid} and query "${query}"`, () => {
            const linkRoute = service.parseLink(link);
            expect(linkRoute.id).toBe(pid);
            expect(linkRoute.query).toBe(query);
        });
    });

    [
        ['%fn%|show-video', 'show-video', ''],
        [
            '"%fn%?f=/wl/add?id=BLU-BLSTIC-NYLON-DOB-CITY-CMT-BCKPACK|POST"',
            'POST',
            '/wl/add?id=BLU-BLSTIC-NYLON-DOB-CITY-CMT-BCKPACK',
        ],
    ].forEach(([link, pid, query]: string[]) => {
        it(`FUNCTIONAL LINK : should return ${pid} and query "${query}"`, () => {
            const linkRoute = service.parseLink(link);
            expect(linkRoute.id).toBe(pid);
            expect(linkRoute.query).toBe(query);
        });
    });
});
