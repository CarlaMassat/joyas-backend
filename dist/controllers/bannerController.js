"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBanners = exports.createBanner = void 0;
const Banner_1 = __importDefault(require("../models/Banner"));
const createBanner = async (req, res) => {
    try {
        const { title, subtitle, link } = req.body;
        const newBanner = new Banner_1.default({ title, subtitle, link });
        await newBanner.save();
        res.status(201).json(newBanner);
    }
    catch (error) {
        res.status(500).json({ message: "Error al agregar el banner", error });
    }
};
exports.createBanner = createBanner;
const getBanners = async (req, res) => {
    try {
        const banners = await Banner_1.default.find();
        res.json(banners);
    }
    catch (error) {
        res.status(500).json({ message: "Error obteniendo los banners", error });
    }
};
exports.getBanners = getBanners;
//# sourceMappingURL=bannerController.js.map