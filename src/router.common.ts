import { Frame, View } from '@nativescript/core';
import { NavigationEntry, NavigationTransition } from '@nativescript/core/ui/frame/frame-interfaces';
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
    auth: boolean
}

export class Common {

}

export class Router {
    private _routes: Array<Route>;
    private unuthenticated: () => void;

    constructor (routes: Array<Route>, unuthenticatedCallback: () => void) {
      this.routes = routes;
      this.unuthenticated = unuthenticatedCallback;
    }

    navigate (options: RouterEntry) : boolean {
      // check if frame exists
      const frame = Frame.getFrameById(options.frame);
      if (!frame) {
        console.error('Frame not found by id');
        return false;
      }

      // get module path
      const modulePath: string = this.getModulePathByPath(options.path);
      if (modulePath === 'NO_MODULE') {
        console.error('Module not found by path');
        return false;
      }

      // initialize navigation entry
      const navigationEntry : NavigationEntry = {
        animated: options.animated,
        backstackVisible: options.backstackVisible,
        bindingContext: options.bindingContext,
        clearHistory: options.clearHistory,
        context: options.context,
        create: options.create,
        moduleName: modulePath,
        transition: options.transition,
        transitionAndroid: options.transitionAndroid,
        transitioniOS: options.transitioniOS
      };

      // navigate to view
      frame.navigate(navigationEntry);

      return true;
    }

    private getModulePathByPath (path: string) : string {
      // search for module
      this.routes.forEach(item => {
        if (path === item.path) {
          return item.modulePath;
        }
      });

      return 'NO_MODULE';
    }

    public set routes (r: Array<Route>) {
      this._routes = r;
    }

    public get routes () {
      return this._routes;
    }
}
