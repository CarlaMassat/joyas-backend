import { Schema, model } from "mongoose";

interface IService {
  title: String;
  description: String;
  link: String;
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

  link: {
    type: String,
    default: "",
  },
  delay: {
    type: Number,
    default: 0,
  },
});

const Service = model<IService>("Service", ServiceSchema);

export default Service;
