"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = exports.Common = void 0;
var core_1 = require("@nativescript/core");
var Common = (function () {
    function Common() {
    }
    return Common;
}());
exports.Common = Common;
var Router = (function () {
    function Router(routes, unuthenticatedCallback) {
        this.routes = routes;
        this.unuthenticated = unuthenticatedCallback;
    }
    Router.prototype.navigate = function (options) {
        var frame = core_1.Frame.getFrameById(options.frame);
        if (!frame) {
            console.error('Frame not found by id');
            return false;
        }
        var modulePath = this.getModulePathByPath(options.path);
        if (modulePath === 'NO_MODULE') {
            console.error('Module not found by path');
            return false;
        }
        var navigationEntry = {
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
        frame.navigate(navigationEntry);
        return true;
    };
    Router.prototype.getModulePathByPath = function (path) {
        this.routes.forEach(function (item) {
            if (path === item.path) {
                return item.modulePath;
            }
        });
        return 'NO_MODULE';
    };
    Object.defineProperty(Router.prototype, "routes", {
        get: function () {
            return this._routes;
        },
        set: function (r) {
            this._routes = r;
        },
        enumerable: false,
        configurable: true
    });
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=router.common.js.map