"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memory_1 = require("../../../ephemeral-db/memory");
class User {
    static findByEmail(email) {
        for (var u of memory_1.users) {
            if (u.email === email) {
                return u;
            }
        }
        return null;
    }
}
exports.User = User;
