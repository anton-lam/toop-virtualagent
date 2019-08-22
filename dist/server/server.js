"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const send = require("koa-send");
const bodyParser = require("koa-bodyparser");
const bearerToken = require("koa-bearer-token");
const compress = require("koa-compress");
const endpoints_1 = require("./endpoints");
class APIServer {
    constructor(app, router) {
        this.app = app;
        this.router = router;
        this.setupServer(app, router);
    }
    setupServer(app, router) {
        this.setupMiddlware(app);
        router.get('/ping', async (ctx) => {
            ctx.status = 200;
            ctx.body = { message: 'ok' };
        });
        endpoints_1.applyEndpoints(app);
        app.use(router.routes());
        app.use(async (ctx) => {
            await send(ctx, `public/index.html`);
        });
    }
    setupMiddlware(app) {
        app.use(bodyParser());
        app.use(bearerToken());
        app.use(compress());
        app.use(async function (ctx, next) {
            try {
                await next();
            }
            catch (err) {
                if (!err.isBoom) {
                    ctx.status = err.output.statusCode;
                    ctx.body = err.output.payload.message;
                }
                else {
                }
            }
        });
    }
    start() {
        return this.app.callback();
    }
}
exports.default = APIServer;
