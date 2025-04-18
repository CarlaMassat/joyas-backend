import { Schema, model } from "mongoose";

interface ICard {
  title: string;
  total: number;
}

const CardSchema: Schema = new Schema<ICard>({
  title: {
    type: String,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },
});

const Card = model<ICard>("Card", CardSchema);

export default Card;