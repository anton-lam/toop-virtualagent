
import { unauthorized } from 'boom';
import { User } from '../api/users/user.model';
import { users } from '../../ephemeral-db/memory';
import { sign } from 'jsonwebtoken';
import Boom from 'boom';

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

    //validate email address
    var re = /\S+@\S+\.\S+/;
    if(!re.test(email)) {
      throw Boom.badRequest(`invalid email`);
    }

    const user = User.findByEmail(email);
  
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

  /**
   * A function that handles registering a user 
   * 
   * @param ctx 
   */
  export const register = async ctx => {
    const email: string = ctx.request.body.email;
    const password: string = ctx.request.body.password;
    const verifyPassword: string = ctx.request.body.verifyPassword;

    if(password != verifyPassword) {
     throw Boom.badRequest(`passwords do not match`);
    }

    //validate email address
    var re = /\S+@\S+\.\S+/;
    if(!re.test(email)) {
      throw Boom.badRequest(`invalid email`);
    }

    //check if email is taken
    const user = User.findByEmail(email);
    if(user) {
      throw Boom.badRequest(`account already exists under this email!`)
    }

    //add user to memory
    users.push( {
      email,
      password
    });

    ctx.status = 201;
    ctx.body = {message: "success"};
  }
