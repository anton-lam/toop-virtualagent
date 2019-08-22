import request from 'supertest';
import { server} from "../../index";


/**
 * Authorize end 2 end tests 
 * 
 * @author anton-lam
 */
describe('/authorize', function() {

    afterAll(async () => {
        await server.close();
    });

    const user = {
        email: "abc@gmail.com",
        password: "password"   
    }
    

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