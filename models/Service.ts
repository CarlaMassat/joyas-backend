import { Schema, model } from "mongoose";

interface IService {
  title: string;
  description: string;
  delay: number;
}

const ServiceSchema: Schema = new Schema<IService>({
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

const Service = model<IService>("Service", ServiceSchema);

export default Service;