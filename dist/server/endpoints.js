"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const auth_1 = require("./auth/auth");
function applyEndpoints(app) {
    const router = new Router();
    router.post('/authorize', auth_1.login);
    app.use(router.routes());
}
exports.applyEndpoints = applyEndpoints;
