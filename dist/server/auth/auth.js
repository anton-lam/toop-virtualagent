"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = require("boom");
const memory_1 = require("../../ephemeral-db/memory");
const jsonwebtoken_1 = require("jsonwebtoken");
function signToken(user) {
    return jsonwebtoken_1.sign({}, "wem39fka", {
        subject: String(user.email),
        issuer: 'anton-lam',
        expiresIn: "9999999"
    });
}
exports.signToken = signToken;
exports.login = async (ctx) => {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    var user = null;
    for (var u of memory_1.users) {
        if (u.email === email) {
            user = u;
            break;
        }
    }
    if (!user)
        throw boom_1.unauthorized('Unauthorized');
    if (password !== user.password) {
        throw boom_1.unauthorized('Unauthorized');
    }
    const token = signToken(user);
    ctx.body = {
        token
    };
};
