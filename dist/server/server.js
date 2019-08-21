"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const send = require("koa-send");
class APIServer {
    constructor(app, router) {
        this.app = app;
        this.router = router;
        this.setupServer(app, router);
    }
    setupServer(app, router) {
        router.get('/ping', async (ctx) => {
            ctx.status = 200;
            ctx.body = { message: 'ok' };
        });
        app.use(router.routes());
        app.use(async (ctx) => {
            await send(ctx, `public/index.html`);
        });
    }
    start() {
        return this.app.callback();
    }
}
exports.default = APIServer;
