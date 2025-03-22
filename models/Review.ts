import { Schema, model } from "mongoose";

interface IReview {
  title: String,
  description: String;
  delay: number;
}

const ReviewSchema: Schema = new Schema<IReview>({
  
 title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  delay: {
    type: Number,
    default: 0,
  },
});

const Review = model<IReview>("Review", ReviewSchema);

export default Review;
