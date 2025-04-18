"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCards = exports.createCard = void 0;
const Card_1 = __importDefault(require("../models/Card"));
const createCard = async (req, res) => {
    try {
        const { title, total } = req.body;
        const newCard = new Card_1.default({ title, total });
        await newCard.save();
        res.status(201).json(newCard);
    }
    catch (error) {
        res.status(500).json({ message: "Error al agregar la card", error });
    }
};
exports.createCard = createCard;
const getCards = async (req, res) => {
    try {
        const cards = await Card_1.default.find();
        res.json(cards);
    }
    catch (error) {
        res.status(500).json({ message: "Error obteniendo las cards", error });
    }
};
exports.getCards = getCards;
//# sourceMappingURL=cardController.js.map