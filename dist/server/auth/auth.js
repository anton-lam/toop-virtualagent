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
const mail_1 = __importDefault(require("@sendgrid/mail"));
const sendgrid_token_model_1 = require("./sendgrid-token.model");
const sendGridAPIKey = "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";
const hostUrl = "http://localhost:3000";
mail_1.default.setApiKey(sendGridAPIKey);
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
    if (!user.isVerified) {
        throw boom_2.default.badRequest('email not verified');
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
    let user = user_model_1.User.findByEmail(email);
    if (user) {
        throw boom_2.default.badRequest(`account already exists under this email!`);
    }
    user = {
        id: Math.floor(Math.random() * 20),
        email,
        isVerified: false,
        password
    };
    console.log(memory_1.users);
    memory_1.users.push(user);
    console.log(user);
    const verificationToken = new sendgrid_token_model_1.VerificationToken(user);
    memory_1.verificationTokens.push(verificationToken);
    await sendVerificationEmail(user.email, verificationToken.token);
    ctx.status = 201;
    ctx.body = { message: "success" };
};
async function sendVerificationEmail(to, token) {
    const msg = {
        to,
        from: 'toop-interview@gg.com.au',
        subject: 'Verify Your Email',
        text: `Click on this link to verify your email ${hostUrl}/authorize/verify?token=${token}&email=${to}`
    };
    return await mail_1.default.send(msg);
}
;
exports.verifyCtr = async (ctx) => {
    console.log("VERIFYCTR");
    const email = ctx.query.email;
    const token = ctx.query.token;
    console.log(ctx.query);
    console.log(email);
    console.log(token);
    const user = await user_model_1.User.findByEmail(email);
    if (!user)
        throw boom_2.default.badRequest('Email address is not available');
    console.log("111111111111");
    let vToken = null;
    for (let vt of memory_1.verificationTokens) {
        if (vt.token === token) {
            vToken = vt;
        }
    }
    console.log(vToken);
    if (!vToken)
        throw boom_2.default.badRequest('Token is not valid');
    console.log("222222222222222222");
    if (vToken.userId.toString() !== user.id.toString())
        throw boom_2.default.badRequest('Token does not match email address');
    console.log("9999999999999999999999");
    user.isVerified = true;
    return { message: `User with ${user.email} has been verified` };
};
//# sourceMappingURL=auth.js.map