import { users } from '../../../ephemeral-db/memory';

/**
 * Object representing User 
 * + useful functions 
 * @export
 * @class User
 */
export class User {
    id: number;
    email: string;
    isVerified: boolean;
    password: string; 

    /**
     * Find if email exists in memory
     *
     * @static
     * @param {string} email
     * @returns {User} or null if it doesn't exist
     * @memberof User
     */
    public static findByEmail(email: string): User {
        for(var u of users) {
            if(u.email === email) {
                return u;
            }
        }
        return null;
    } 
}

