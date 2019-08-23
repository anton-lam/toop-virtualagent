import { randomBytes } from "crypto";
import { User } from "../api/users/user.model";

/**
 * Verification Token for SendGrid
 *
 * @export
 * @param {User} user
 */
export function VerificationToken (user: User) {
    this.id = Math.random();
    this.userId = user.id;
    this.token = randomBytes(16).toString('hex')
}

