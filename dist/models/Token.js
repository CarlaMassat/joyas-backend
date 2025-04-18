"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: Date.now(),
        expires: "10m",
    },
});
const Token = (0, mongoose_1.model)("Token", TokenSchema);
exports.default = Token;
//# sourceMappingURL=Token.js.map