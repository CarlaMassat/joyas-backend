"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviews = exports.createReview = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const createReview = async (req, res) => {
    try {
        const { title, description, delay } = req.body;
        const newReview = new Review_1.default({ title, description, delay });
        await newReview.save();
        res.status(201).json(newReview);
    }
    catch (error) {
        res.status(500).json({ message: "Error al agregar review", error });
    }
};
exports.createReview = createReview;
const getReviews = async (req, res) => {
    try {
        const reviews = await Review_1.default.find();
        res.json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: "Error obteniendo reviews", error });
    }
};
exports.getReviews = getReviews;
//# sourceMappingURL=reviewController.js.map