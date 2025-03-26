"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BannerSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});
const Banner = (0, mongoose_1.model)("Banner", BannerSchema);
exports.default = Banner;
//# sourceMappingURL=Banner.js.map