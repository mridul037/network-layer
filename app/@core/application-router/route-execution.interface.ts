export interface RouteExecutionInterface {
    executePageLink(pageId: string, query: string);
    executeFunctionLink(id: string, query: string);

    processLink(link: string);
}
