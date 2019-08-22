"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_send_1 = __importDefault(require("koa-send"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_bearer_token_1 = __importDefault(require("koa-bearer-token"));
const koa_compress_1 = __importDefault(require("koa-compress"));
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
            await koa_send_1.default(ctx, `public/index.html`);
        });
    }
    setupMiddlware(app) {
        app.use(koa_bodyparser_1.default());
        app.use(koa_bearer_token_1.default());
        app.use(koa_compress_1.default());
        app.use(async function (ctx, next) {
            try {
                await next();
            }
            catch (err) {
                if (err.isBoom) {
                    ctx.status = err.output.statusCode;
                    ctx.body = err.output.payload.message;
                }
                else {
                    console.log(err);
                    ctx.status = 500;
                    ctx.body = "Internal Server Error";
                }
            }
        });
    }
    start() {
        return this.app.callback();
    }
}
exports.default = APIServer;
