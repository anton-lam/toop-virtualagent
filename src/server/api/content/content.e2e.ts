import { server} from "../../../index";
import request from 'supertest';
import { contentText } from "./content";
import { signToken } from "../../auth/auth";

/**
 * Content end 2 end tests 
 * 
 * @author anton-lam
 */
describe('/content', function() {
    afterAll(async () => {
        await server.close();
    });

    describe('get content', function() {
        it('should return partial content passage', async function() {
            const result = await request(server)
                .get(`/content`);

                expect(result.status).toEqual(200);
                expect(result.body.text).toEqual(`${contentText.slice(0, contentText.length / 2)}...`);
        });

        it('should return full content passage', async function() {

            //get mock token 
            const token = await signToken({ id: 3, isVerified: true, email: "lol@gmail.com", password: null});

            const result = await request(server)
                .get(`/content`)
                .set('Authorization', `Bearer ${token}`);


                expect(result.status).toEqual(200);
                expect(result.body.text).toEqual(contentText);

        });
    });
});