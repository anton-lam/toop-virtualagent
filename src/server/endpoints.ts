import * as Koa from 'koa';
import * as Router from 'koa-router';

/**
 * Applies the common endpoints needed to view content, auth
 * 
 * TODO: 
 * getContent endpoint (if not logged in return only partial) 
 * register endpoint, 
 * login endpoint,  
 * EXTRA getAll emails 
 * 
 * @author anton-lam
 */

export const applyEndpoints = (app: Koa) => {
  
  // Create the router with the prefix '/api
  const router = new Router({ prefix: '/api' });

}