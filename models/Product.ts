import mongoose from "mongoose";
import { Schema, model } from "mongoose";

interface IProduct {
    name: string;
    category: mongoose.Types.ObjectId;
    description: string;
    price: number;
    stock: number;
    image?: string;
}

const ProductSchema: Schema = new Schema<IProduct>({
   
    name: {
        type: String,
        required: true

    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',  
        required: true
    },

    description: {
        type: String,
        required: true

    },

    price: {
        type: Number,
        required: true

    },

    stock: {
        type: Number,
        required: true

    },


    image: {
        type: String,
     
    },


})
const Product = model<IProduct>('Product', ProductSchema)

export default Product