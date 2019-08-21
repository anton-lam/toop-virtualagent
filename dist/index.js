"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const Koa = require("koa");
const Router = require("koa-router");
const server_1 = require("./server/server");
exports.app = new server_1.default(new Koa(), new Router());
exports.server = http.createServer(exports.app.start());
exports.server.listen(8080, () => {
    console.log(`HTTP server listening on port 8080`);
});
