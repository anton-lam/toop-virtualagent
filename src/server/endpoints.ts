import  Koa from 'koa';
import  Router from 'koa-router';
import { login, register } from './auth/auth';
import { getContent } from './api/content/content';


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

export function applyEndpoints(app: Koa) {
    const router = new Router();

    router.post('/authorize', login);
    router.post('/register', register);
    router.get('/content', getContent);

    app.use(router.routes());
}




