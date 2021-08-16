"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = exports.Common = void 0;
var core_1 = require("@nativescript/core");
var events = require("events");
var Common = (function () {
    function Common() {
    }
    return Common;
}());
exports.Common = Common;
var Router = (function (_super) {
    __extends(Router, _super);
    function Router(routes, unuthenticatedCallback) {
        var _this = _super.call(this) || this;
        _this.routes = routes;
        _this.unuthenticated = unuthenticatedCallback;
        return _this;
    }
    Router.prototype.navigate = function (options) {
        var _this = this;
        this.emit('navigating', options);
        var frame = core_1.Frame.getFrameById(options.frame);
        if (!frame) {
            console.error('Frame not found by id');
            return false;
        }
        this.getModulePathByPath(options.path).then(function (path) {
            var navigationEntry = {
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
            frame.navigate(navigationEntry);
            if (options.authenticated === true) {
                _this.unuthenticated();
            }
            return true;
        }).catch(function (error) {
            console.error(error);
            return false;
        });
    };
    Router.prototype.goBack = function (frameId) {
        var frame = core_1.Frame.getFrameById(frameId || 'default');
        if (!frame) {
            console.error('Frame not found by id');
            return false;
        }
        frame.goBack();
        return true;
    };
    Router.prototype.openModal = function (options) {
        this.getModulePathByPath(options.path).then(function (path) {
            core_1.Frame.topmost().showModal(path, options);
        }).catch(function () {
            console.error('MODULE_NOT_FOUND');
        });
    };
    Router.prototype.closeModalPage = function () {
        core_1.Frame.topmost().modal.closeModal();
        return true;
    };
    Router.prototype.getModulePathByPath = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        _this.routes.forEach(function (item) {
                            if (path === item.path) {
                                resolve(item.modulePath);
                            }
                        });
                        reject(new Error('MODULE_NOT_FOUND'));
                    })];
            });
        });
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
}(events.EventEmitter));
exports.Router = Router;
//# sourceMappingURL=router.common.js.map