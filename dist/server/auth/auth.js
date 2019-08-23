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
    const { email, password } = ctx.request.body;
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
    const { email, password, verifyPassword } = ctx.request.body;
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
    memory_1.users.push(user);
    const verificationToken = new sendgrid_token_model_1.VerificationToken(user);
    memory_1.verificationTokens.push(verificationToken);
    await sendVerificationEmail(user.email, verificationToken.token);
    ctx.status = 201;
    ctx.body = { message: "success" };
};
async function sendVerificationEmail(to, token) {
    console.log("SENDING VERIFICATION EMAIL...");
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
    const { email, token } = ctx.query;
    console.log("VERIFYCTR");
    console.log(email);
    console.log(token);
    const user = await user_model_1.User.findByEmail(email);
    if (!user)
        throw boom_2.default.badRequest('Email address is not available');
    let vToken = null;
    for (let vt of memory_1.verificationTokens) {
        if (vt.token === token) {
            vToken = vt;
        }
    }
    if (!vToken)
        throw boom_2.default.badRequest('Token is not valid');
    if (vToken.userId.toString() !== user.id.toString())
        throw boom_2.default.badRequest('Token does not match email address');
    user.isVerified = true;
    ctx.status = 200;
    ctx.body = { message: "Your account is now verified. Please login at http://localhost:4200" };
};
//# sourceMappingURL=auth.js.map