import { server} from "../../../index";
import request from 'supertest';
import { signToken } from "../../auth/auth";

/**
 * User end 2 end tests 
 * 
 * @author anton-lam
 */
describe('/content', function() {
    afterAll(async () => {
        await server.close();
    });

    describe('get users', function() {
        it('should return unauthorized', async function() {
            const result = await request(server)
                .get(`/emails`);

                expect(result.status).toEqual(401);
        });

        it('should return array of users', async function() {

            //get mock token 
            const token = await signToken({ id: 3, isVerified: true, email: "lol@gmail.com", password: null});

            const result = await request(server)
                .get(`/emails`)
                .set('Authorization', `Bearer ${token}`);
           
                expect(result.body.users).not.toBeNull();

        });
    });
});