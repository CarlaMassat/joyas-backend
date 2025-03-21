import { Request, Response } from "express";
import Banner from "../models/Banner";

export const createBanner = async (

    req: Request,
    res: Response
) : Promise<any> => {

    try {
        const {title, subtitle, link} = req.body
        const newBanner = new Banner ({title, subtitle, link});
        await newBanner.save();
        res.status(201).json(newBanner);


    } catch (error) {
        res.status(500).json({ message: "Error al agregar el banner", error });
    }
}


export const getBanners = async (

    req: Request,
    res: Response

): Promise<any> => {

    try {
        const banners = await Banner.find();
        res.json(banners);
        
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo los banners", error });
    }
}