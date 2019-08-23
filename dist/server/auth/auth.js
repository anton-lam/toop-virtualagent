"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = require("boom");
const user_model_1 = require("../api/users/user.model");
const memory_1 = require("../../ephemeral-db/memory");
const jsonwebtoken_1 = require("jsonwebtoken");
const boom_2 = __importDefault(require("boom"));
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
    var re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
        throw boom_2.default.badRequest(`invalid email`);
    }
    const user = user_model_1.User.findByEmail(email);
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
exports.register = async (ctx) => {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    const verifyPassword = ctx.request.body.verifyPassword;
    if (password != verifyPassword) {
        throw boom_2.default.badRequest(`passwords do not match`);
    }
    var re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
        throw boom_2.default.badRequest(`invalid email`);
    }
    const user = user_model_1.User.findByEmail(email);
    if (user) {
        throw boom_2.default.badRequest(`account already exists under this email!`);
    }
    memory_1.users.push({
        email,
        password
    });
    ctx.status = 201;
    ctx.body = { message: "success" };
};
//# sourceMappingURL=auth.js.map