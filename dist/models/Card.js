"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CardSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});
const Card = (0, mongoose_1.model)("Card", CardSchema);
exports.default = Card;
//# sourceMappingURL=Card.js.map