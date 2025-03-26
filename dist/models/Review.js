"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    delay: {
        type: Number,
        default: 0,
    },
});
const Review = (0, mongoose_1.model)("Review", ReviewSchema);
exports.default = Review;
//# sourceMappingURL=Review.js.map