import { Request, Response } from "express";
import Review from "../models/Review";

export const createReview = async (
    
    req: Request,
    res: Response

) : Promise <any> =>{

    try {
        
        const {title, description, delay} = req.body;
        const newReview = new Review({title, description, delay});
        await newReview.save();
        res.status(201).json(newReview);


    } catch (error) {
         res.status(500).json({ message: "Error al agregar review", error });
    }
}


export const getReviews = async (

    req: Request,
    res: Response

): Promise<any> => {

    try {
        const reviews = await Review.find();
        res.json(reviews);
        
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo reviews", error });
    }
}