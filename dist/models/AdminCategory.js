"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});
const AdminCategory = (0, mongoose_1.model)("AdminCategory", AdminCategorySchema);
exports.default = AdminCategory;
//# sourceMappingURL=AdminCategory.js.map