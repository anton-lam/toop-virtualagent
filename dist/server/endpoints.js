"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = require("./auth/auth");
const content_1 = require("./api/content/content");
function applyEndpoints(app) {
    const router = new koa_router_1.default();
    router.post('/authorize', auth_1.login);
    router.post('/register', auth_1.register);
    router.get('/authorize/verify', auth_1.verifyCtr);
    router.get('/content', content_1.getContent);
    router.get('/emails', getEmails);
    app.use(router.routes());
}
exports.applyEndpoints = applyEndpoints;
//# sourceMappingURL=endpoints.js.map