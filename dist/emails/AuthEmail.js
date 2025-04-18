"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEmail = void 0;
const nodemail_1 = require("../config/nodemail");
class AuthEmail {
    static sendConfirmationEmail = async (user) => {
        await nodemail_1.transporter.sendMail({
            from: "joyas <contacto.rafijoyas@gmail.com>",
            to: user.email,
            subject: "Joyas - Confirm your Account",
            text: "Joyas - Confirm your Account",
            html: `<p>Hola: ${user.name}, has creado tu cuenta en RafiJoyas, ya casi esta
        todo listo, solo debes confirmar tu cuenta</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
        <p>Ingresa el codigo:<b>${user.token}</b></p> 
        <p>Este token expira en 10 minutos</p>
        `,
        });
    };
    static sendPasswordResetToken = async (user) => {
        await nodemail_1.transporter.sendMail({
            from: "joyas <contacto.rafijoyas@gmail.com>",
            to: user.email,
            subject: "Joyas - Restablece tu password",
            text: "Joyas - Restablece tu password",
            html: `<p>Hola: ${user.name}, has solicitado restablecer tu password.</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer password</a>
        <p>Ingresa el codigo:<b>${user.token}</b></p> 
        <p>Este token expira en 10 minutos</p>
        `,
        });
    };
}
exports.AuthEmail = AuthEmail;
//# sourceMappingURL=AuthEmail.js.map