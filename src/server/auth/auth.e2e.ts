import request from 'supertest';
import { server} from "../../index";
import { User } from '../api/users/user.model';


/**
 * Authorize end 2 end tests 
 * 
 * @author anton-lam
 */
describe('/authorize', function() {

    /** Mocks */
    const user = {
        email: "abc@gmail.com",
        password: "password"   
    }

    afterAll(async () => {
        await server.close();
    });

    describe('login success', function() {
        it('should login successfully and return token', async function() {
            const result = await request(server)
                .post(`/authorize`)
                .send(user);

                expect(result.status).toEqual(200);
                expect(result.body.token).not.toBeUndefined();
        });
    });

    describe('login failure', function() {
        it('should be a failed login attempt', async function() {
            user.password = "badpassword";

            const result = await request(server)
                .post(`/authorize`)
                .send(user);

                expect(result.status).toEqual(401);
                expect(result.body.token).toBeUndefined();
        });
    });
});


describe('/register', function() {

    var user;

    afterAll(async () => {
        await server.close();
    });

    beforeEach(async () => {
            /** Mocks */
            user = {
                email: "test@gmail.com",
                password: "password",
                verifyPassword: "password"
            }
    });
    

    describe('register success', function() {
        it('should register successfully', async function() {
            const result = await request(server)
                .post(`/register`)
                .send(user);

                expect(result.status).toEqual(201);

                //confirm it's in memory too
                expect(User.findByEmail(user.email)).not.toBeNull();
        });
    });

    describe('invalid email', function() {
        it('fail registering', async function() {
            user.email = "bademail";

            const result = await request(server)
                .post(`/register`)
                .send(user);

                expect(result.status).toEqual(400);
                expect(result.error.text).toEqual(`Invalid email`);
        });
    });

    describe('unmatching passwords', function() {
        it('fail registering', async function() {
            user.password = "badpassword";

            const result = await request(server)
                .post(`/register`)
                .send(user);

                expect(result.status).toEqual(400);
                expect(result.error.text).toEqual(`Passwords do not match`);
        });
    });

    describe('email already exists', function() {
        it('fail registering', async function() {
            user.email = "abc@gmail.com";

            const result = await request(server)
                .post(`/register`)
                .send(user);

                expect(result.status).toEqual(400);
                expect(result.error.text).toEqual(`Account already exists under this email!`);
        });
    });
});