import { Request, Response } from "express";
import Card from "../models/Card";

export const createCard = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, total } = req.body;
    const newCard = new Card({ title, total });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar la card", error });
  }
};

export const getCards = async (req: Request, res: Response): Promise<any> => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo las cards", error });
  }
};