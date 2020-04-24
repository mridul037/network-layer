import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteExecutionInterface } from './route-execution.interface';

@Injectable({
    providedIn: 'root',
})
export class ApplicationRouterService implements RouteExecutionInterface {
    constructor(private router: Router) {}

    executeFunctionLink(id: string, query: string) {}

    executePageLink(pageId: string, query: string) {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl(pageId, {
            queryParamsHandling: 'preserve',
            queryParams: {
                f: query,
            },
        });
    }

    processLink(link: string) {}

    parseLink(link: string): IRouteParse {
        let link_id: string;
        if (link.indexOf('lp') === -1) link_id = '';
        else link_id = 'lp';

        let link_type: ERouteType;
        if (link.includes('f=')) link_type = ERouteType.page;
        else link_type = ERouteType.function;

        let link_query: string = '';
        let parse_link;
        let valueOfIndex = -1;
        let split_link = link.split('&');

        for (let x = 0; x < split_link.length; x++) {
            if (split_link[x].includes('f=')) {
                valueOfIndex = split_link[x].indexOf('f=');
                parse_link = split_link[x];
                break;
            }
        }
        if (valueOfIndex !== -1) {
            valueOfIndex += 2;
            for (let i = valueOfIndex; i < parse_link.length; i++) {
                link_query += parse_link[i];
            }
        }

        return {
            id: link_id,
            type: link_type,
            query: link_query,
        };
    }
}

export interface IRouteParse {
    type: ERouteType;
    id: string;
    query: string;
}

export enum ERouteType {
    function,
    page,
}
