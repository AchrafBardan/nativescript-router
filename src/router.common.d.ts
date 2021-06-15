import { View } from '@nativescript/core';
import { NavigationTransition } from '@nativescript/core/ui/frame/frame-interfaces';
export interface RouterEntry {
    path: string;
    frame: string;
    context?: any;
    bindingContext?: any;
    animated?: boolean;
    transition?: NavigationTransition;
    transitioniOS?: NavigationTransition;
    transitionAndroid?: NavigationTransition;
    backstackVisible?: boolean;
    clearHistory?: boolean;
    authenticated?: boolean;
    create?: () => View;
    unuthenticated?: () => void;
}
export interface Route {
    path: string;
    modulePath: string;
    auth: boolean;
}
export declare class Common {
}
export declare class Router {
    private _routes;
    private unuthenticated;
    constructor(routes: Array<Route>, unuthenticatedCallback: () => void);
    navigate(options: RouterEntry): boolean;
    private getModulePathByPath;
    set routes(r: Array<Route>);
    get routes(): Array<Route>;
}
