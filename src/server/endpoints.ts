import  Koa from 'koa';
import  Router from 'koa-router';
import { login, register, verifyCtr } from './auth/auth';
import { getContent } from './api/content/content';
import { getEmails } from './api/users/user';


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
    router.get('/authorize/verify', verifyCtr);

    router.get('/content', getContent);
    router.get('/emails', getEmails);


    app.use(router.routes());
}




