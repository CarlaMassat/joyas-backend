"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.updatePasswordWithToken = exports.validateToken = exports.forgotPassword = exports.requestConfirmationCode = exports.login = exports.confirmAccount = exports.createAccount = void 0;
const User_1 = __importDefault(require("../models/User"));
const Token_1 = __importDefault(require("../models/Token"));
const auth_1 = require("../utils/auth");
const token_1 = require("../utils/token");
const AuthEmail_1 = require("../emails/AuthEmail");
const jwt_1 = require("../utils/jwt");
const createAccount = async (req, res) => {
    try {
        const { password, email } = req.body;
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            const error = new Error("Email ya registrado");
            return res.status(409).json({ error: error.message });
        }
        const user = new User_1.default(req.body);
        user.password = await (0, auth_1.hashPassword)(password);
        const token = new Token_1.default();
        token.token = (0, token_1.generateToken)();
        token.user = user.id;
        AuthEmail_1.AuthEmail.sendConfirmationEmail({
            email: user.email,
            name: user.name_lastname,
            token: token.token,
        });
        await Promise.allSettled([user.save(), token.save()]);
        res.send("Cuenta creada, verifica tu e-mail");
    }
    catch (error) {
        res.status(500).json({ error: "La cuenta no pudo ser creada" });
    }
};
exports.createAccount = createAccount;
const confirmAccount = async (req, res) => {
    try {
        const { token } = req.body;
        const tokenExists = await Token_1.default.findOne({ token });
        if (!tokenExists) {
            const error = new Error("Token no válido");
            res.status(404).json({ error: error.message });
        }
        const user = await User_1.default.findById(tokenExists.user);
        user.confirmed = true;
        await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
        res.send("La cuenta está lista");
    }
    catch (error) {
        res.status(500).json({ error: "La cuenta no pudo ser creada" });
    }
};
exports.confirmAccount = confirmAccount;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            const error = new Error("No pudimos encontrar una cuenta con esa dirección de correo electrónico");
            return res.status(404).json({ error: error.message });
        }
        if (!user.confirmed) {
            const token = new Token_1.default();
            token.user = user.id;
            token.token = (0, token_1.generateToken)();
            await token.save();
            AuthEmail_1.AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name_lastname,
                token: token.token,
            });
            const error = new Error("La cuenta no ha sido confirmada, verifica tu dirección de correo electrónico ");
            return res.status(401).json({ error: error.message });
        }
        const isPasswordCorrect = await (0, auth_1.checkPassword)(password, user.password);
        if (!isPasswordCorrect) {
            const error = new Error("Password incorrecto ");
            return res.status(401).json({ error: error.message });
        }
        const token = (0, jwt_1.generateJWT)({ id: user._id });
        return res.send(token);
    }
    catch (error) {
        return res.status(500).json({ error: "Hubo un error" });
    }
};
exports.login = login;
const requestConfirmationCode = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            const error = new Error("El usuario no esta registrado");
            return res.status(404).json({ error: error.message });
        }
        if (user.confirmed) {
            const error = new Error("El usuario ya esta confirmado");
            return res.status(403).json({ error: error.message });
        }
        const token = new Token_1.default();
        token.token = (0, token_1.generateToken)();
        token.user = user.id;
        AuthEmail_1.AuthEmail.sendConfirmationEmail({
            email: user.email,
            name: user.name_lastname,
            token: token.token,
        });
        await Promise.allSettled([user.save(), token.save()]);
        res.send("Se envió un nuevo token");
    }
    catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
};
exports.requestConfirmationCode = requestConfirmationCode;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            const error = new Error("El usuario no esta registrado");
            return res.status(404).json({ error: error.message });
        }
        const token = new Token_1.default();
        token.token = (0, token_1.generateToken)();
        token.user = user.id;
        await token.save();
        AuthEmail_1.AuthEmail.sendPasswordResetToken({
            email: user.email,
            name: user.name_lastname,
            token: token.token,
        });
        res.send("Revisa tu email para instrucciones");
    }
    catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
};
exports.forgotPassword = forgotPassword;
const validateToken = async (req, res) => {
    try {
        const { token } = req.body;
        const tokenExists = await Token_1.default.findOne({ token });
        if (!tokenExists) {
            const error = new Error("Token no válido");
            res.status(404).json({ error: error.message });
        }
        res.send("Token válido, define nueva password");
    }
    catch (error) {
        res.status(500).json({ error: "La cuenta no pudo ser creada" });
    }
};
exports.validateToken = validateToken;
const updatePasswordWithToken = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const tokenExists = await Token_1.default.findOne({ token });
        if (!tokenExists) {
            const error = new Error("Token no válido");
            res.status(404).json({ error: error.message });
        }
        const user = await User_1.default.findById(tokenExists.user);
        user.password = await (0, auth_1.hashPassword)(password);
        await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
        res.send("El password se modificó correctamente");
    }
    catch (error) {
        res.status(500).json({ error: "La cuenta no pudo ser creada" });
    }
};
exports.updatePasswordWithToken = updatePasswordWithToken;
const user = async (req, res) => {
    return res.json(req.user);
};
exports.user = user;
//# sourceMappingURL=authController.js.map