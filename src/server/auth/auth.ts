
  import { unauthorized } from 'boom';
  import { User } from '../api/users/user.model';
  import { users, verificationTokens } from '../../ephemeral-db/memory';
  import { sign } from 'jsonwebtoken';
  import Boom from 'boom';
  import sgMail from '@sendgrid/mail';
  import { VerificationToken } from './sendgrid-token.model';


  /** constants for sendGrid email verification */
  const hostUrl = "http://localhost:3000";

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
      const { email, password } = ctx.request.body;

      //validate email address
      var re = /\S+@\S+\.\S+/;
      if(!re.test(email)) {
        throw Boom.badRequest(`Invalid email`);
      }

      const user = User.findByEmail(email);
    
      if (!user) throw unauthorized('Unauthorized');

      if(password !== user.password) {
          throw unauthorized('Unauthorized');
      }

      if(!user.isVerified) {
        throw Boom.badRequest('Email not verified');
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
      const { email, password, verifyPassword } = ctx.request.body;

      if(password != verifyPassword) {
      throw Boom.badRequest(`Passwords do not match`);
      }

      //validate email address
      var re = /\S+@\S+\.\S+/;
      if(!re.test(email)) {
        throw Boom.badRequest(`Invalid email`);
      }

      //check if email is taken
      let user: User = User.findByEmail(email);
      if(user) {
        throw Boom.badRequest(`Account already exists under this email!`)
      }

      //add user to memory
      user = {
        id: Math.floor(Math.random() * 20),
        email,
        isVerified: false,
        password
      };

      users.push(user);

      const verificationToken = new VerificationToken(user);
      verificationTokens.push(verificationToken);

      await sendVerificationEmail(user.email, verificationToken.token);

      ctx.status = 201;
      ctx.body = {message: "success"};
    }

  /**
   * uses sendGrid to send email
   *
   * @param {string} to
   * @param {string} token
   * @returns
   */
  async function sendVerificationEmail(to: string, token: string) {
    const msg = {
      to,
      from: 'toop-interview@gg.com.au',
      subject: 'Verify Your Email',
      text: `Click on this link to verify your email ${hostUrl}/authorize/verify?token=${token}&email=${to}`
    };   

    try {
      sgMail.setApiKey(process.env.SEND_GRID_API_KEY );
      return await sgMail.send(msg);
    } catch (err) {
      throw Boom.badRequest("invalid API Key");
    }

  };

  /**
   * 
   * @param ctx 
   */
  export const verifyCtr = async ctx => {
    const { email, token} = ctx.query;

    /**  Check the user exists and is not already registered */
    const user = await User.findByEmail(email);
    if (!user) throw Boom.badRequest('Email address is not available');

    /**  Check the provided Token is valid  */
    let vToken = null;
    for(let vt of verificationTokens) {
      if(vt.token === token) {
        vToken = vt;
      }
    }

    if(!vToken) throw Boom.badRequest('Token is not valid');

    
    /**  Is the provided token and email a match  */
    if (vToken.userId.toString() !== user.id.toString())
      throw Boom.badRequest('Token does not match email address');
    
    /**  Update the user status to valid, and remove the token from the db. */
    user.isVerified = true;
    ctx.status = 200;
    ctx.body = {message: "Your account is now verified. Please login at http://localhost:4200"};
  };

    