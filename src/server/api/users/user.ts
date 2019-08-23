import { users } from "../../../ephemeral-db/memory";
import { verify } from 'jsonwebtoken';
import { unauthorized } from 'boom';

/**
 * Endpoint to get all emails if logged in
 * @param ctx 
 */
export const getEmails = async ctx => {
    
    //if token is valid, then return emails
    //TODO: move it out of user.ts so it can be used for other endpoints rather than repeating myself
    try{
        ctx.state.token = verify(ctx.request.token, "wem39fka");
        ctx.body = { users };
    }catch (err) {
        throw unauthorized('Unauthorized');
    }
}