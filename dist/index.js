"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const server_1 = __importDefault(require("./server/server"));
exports.app = new server_1.default(new koa_1.default(), new koa_router_1.default());
exports.server = http_1.default.createServer(exports.app.start());
exports.server.listen(3000, () => {
    console.log(`HTTP server listening on port 3000`);
});
//# sourceMappingURL=index.js.map