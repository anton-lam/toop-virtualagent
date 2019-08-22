
import { unauthorized } from 'boom';
import { User } from '../api/users/user.model';
import { users } from '../../ephemeral-db/memory';
import { sign } from 'jsonwebtoken';

// A function that returns a singed JWT
export function signToken(user: User) {
    return sign(
      {},
      "wem39fka",
      {
        subject: String(user.email),
        issuer: 'anton-lam',
        expiresIn: "9999999"
      }
    );
  }


/**
 *  A function that handles logging a user in
 *
 * @returns { Object } A User and signed JWT.
 */
export const login = async ctx => {
    const email: string = ctx.request.body.email;
    const password: string = ctx.request.body.password;

    
    var user = null;
    for(var u of users) {
        if(u.email === email) {
            user = u;
            break;
        }
    }
  
    if (!user) throw unauthorized('Unauthorized');

    if(password !== user.password) {
        throw unauthorized('Unauthorized');
    }

    // create a signed JWT Token
    const token = signToken(user);

    // return an object with the user and the password
    ctx.body = {
        token
    }
  }