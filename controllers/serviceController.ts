import { Request, Response } from "express";
import Service from "../models/Service";

export const createService = async (
    req: Request,
    res: Response

): Promise<any> => {

    try {
      const {title, description,delay } = req.body;
      const newService = new Service ({title, description,delay});
      await newService.save();
      res.status(201).json(newService);
        
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el servicio", error });
    }

}

export const getServices = async (

    req: Request,
    res: Response

): Promise<any> => {

    try {
        const services = await Service.find();
        res.json(services);
        
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo los servicios", error });
    }
}