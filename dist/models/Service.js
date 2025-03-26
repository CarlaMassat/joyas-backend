"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ServiceSchema = new mongoose_1.Schema({
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
const Service = (0, mongoose_1.model)("Service", ServiceSchema);
exports.default = Service;
//# sourceMappingURL=Service.js.map