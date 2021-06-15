import { Frame, Page, ShowModalOptions, View } from '@nativescript/core';
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

export interface OpenModalOptions extends ShowModalOptions {
  frameId?: string;
  path: string;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  module NodeJS {
    // eslint-disable-next-line no-unused-vars
    interface Global {
      router: Router;
    }
  }
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
      this.getModulePathByPath(options.path).then(path => {
        // initialize navigation entry
        const navigationEntry : NavigationEntry = {
          animated: options.animated,
          backstackVisible: options.backstackVisible,
          bindingContext: options.bindingContext,
          clearHistory: options.clearHistory,
          context: options.context,
          create: options.create,
          moduleName: path,
          transition: options.transition,
          transitionAndroid: options.transitionAndroid,
          transitioniOS: options.transitioniOS
        };

        // navigate to view
        frame.navigate(navigationEntry);

        // authenticated callback
        if (options.authenticated === true) {
          this.unuthenticated();
        }

        return true;
      }).catch(error => {
        console.error(error);
        return false;
      });
    }

    /*
      Go back to the last navigated page, when frameId not set will try default frame
    */
    public goBack (frameId?: string) : boolean {
      // check if frame exists
      const frame = Frame.getFrameById(frameId || 'default');
      if (!frame) {
        console.error('Frame not found by id');
        return false;
      }

      frame.goBack();

      return true;
    }

    public openModal (options: OpenModalOptions) : boolean {
      // check if frame exists
      const frame = Frame.getFrameById(options.frameId || 'default');
      if (!frame) {
        console.error('Frame not found by id');
        return false;
      }

      this.getModulePathByPath(options.path).then(path => {
        frame.showModal(path, options);

        return true;
      }).catch(() => {
        return false;
      });
    }

    public closeModalPage (page: Page) : boolean {
      page.closeModal();
      return true;
    }

    private async getModulePathByPath (path: string) : Promise<string> {
      // search for module
      return new Promise<string>((resolve, reject) => {
        this.routes.forEach(item => {
          if (path === item.path) {
            resolve(item.modulePath);
          }
        });
        reject(new Error('MODULE_NOT_FOUND'));
      });
    }

    private set routes (r: Array<Route>) {
      this._routes = r;
    }

    private get routes () {
      return this._routes;
    }
}
