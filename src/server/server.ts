import * as Koa from 'koa';
import * as send from 'koa-send';
import * as Router from 'koa-router';

/**
 * Class that sets up the API server 
 * Including routes, endpoints and redirection 
 * 
 * @author anton-lam
 */
export default class APIServer {
    constructor(private app: Koa, private router: Router) {
      this.setupServer(app, router);
    }

  // A method to set up all the server configuration
  private setupServer(app: Koa, router: Router) {

    //basic ping for testing purposes
    router.get('/ping', async ctx => {
        ctx.status = 200;
        ctx.body = { message: 'ok' };
      });

    
    app.use(router.routes());

    // Middleware function that handles all unmatched URL routes
    // All request should be directed to the index.html file
    // The entry point for the angular application
    app.use(async ctx => {
        await send(ctx, `public/index.html`);
      });
  }

  // A public method that returns the server as callback
  // Compatible with the native http, https or http2 module
  public start() {
    return this.app.callback();
  }
}