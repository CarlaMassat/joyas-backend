"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServices = exports.createService = void 0;
const Service_1 = __importDefault(require("../models/Service"));
const createService = async (req, res) => {
    try {
        const { title, description, delay } = req.body;
        const newService = new Service_1.default({ title, description, delay });
        await newService.save();
        res.status(201).json(newService);
    }
    catch (error) {
        res.status(500).json({ message: "Error al agregar el servicio", error });
    }
};
exports.createService = createService;
const getServices = async (req, res) => {
    try {
        const services = await Service_1.default.find();
        res.json(services);
    }
    catch (error) {
        res.status(500).json({ message: "Error obteniendo los servicios", error });
    }
};
exports.getServices = getServices;
//# sourceMappingURL=serviceController.js.map