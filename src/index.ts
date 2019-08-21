import * as http from 'http';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import APIServer from './server/server';


/**
 * Entry point for the entire application 
 * @author anton-lam
 */
export let server: http.Server;

// Pass in an instance of a Koa app and koa Router
export const app = new APIServer(new Koa(), new Router());

server = http.createServer(app.start());

server.listen(8080, () => {
    console.log(`HTTP server listening on port 8080`);
  });