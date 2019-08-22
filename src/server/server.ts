import * as Koa from 'koa';
import * as send from 'koa-send';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as bearerToken from 'koa-bearer-token';
import * as compress from 'koa-compress';
import { applyEndpoints } from './endpoints';

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

  /**
   * A method to set up all the server configuration
   * @param app Koa middleware handler
   * @param router middlewater for router routes 
   */
  private setupServer(app: Koa, router: Router) {
    
    this.setupMiddlware(app);

    //basic ping for testing purposes
    router.get('/ping', async ctx => {
        ctx.status = 200;
        ctx.body = { message: 'ok' };
      });

    //apply basic endpoints
    applyEndpoints(app);
    
    app.use(router.routes());

    // Middleware function that handles all unmatched URL routes
    // All request should be directed to the index.html file
    // The entry point for the angular application
    app.use(async ctx => {
        await send(ctx, `public/index.html`);
      });
  }

  /**
   * Setup required middleware to 
   * Help parsing req.body to JSON format for easy use
   * extracts token to req.token, compress req
   * + global error handling
   * @param app 
   */
  private setupMiddlware(app) {
    app.use(bodyParser());
    app.use(bearerToken());
    app.use(compress());


    // custom error handling utilising boom 
    app.use(async function(ctx, next) {
      try {
        await next();
      } catch(err) {

        if(err.isBoom) {
          ctx.status = err.output.statusCode;
          ctx.body = err.output.payload.message;
        } else {
          console.log(err);
          ctx.status = 500;
          ctx.body = "Internal Server Error";
        }
      }
    });
  }

  // A public method that returns the server as callback
  // Compatible with the native http, https or http2 module
  public start() {
    return this.app.callback();
  }
}