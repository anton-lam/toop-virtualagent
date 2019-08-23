import http from 'http';
import Koa from 'koa';
import Router from 'koa-router';
import APIServer from './server/server';


/**
 * Entry point for the entire application 
 * @author anton-lam
 */
export let server: http.Server;

// Pass in an instance of a Koa app and koa Router
export const app = new APIServer(new Koa(), new Router());

server = http.createServer(app.start());

server.listen(3000, () => {
    console.log(`HTTP server listening on port 3000`);
  });