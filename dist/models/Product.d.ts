import mongoose from "mongoose";
interface IProduct {
    name: string;
    category: mongoose.Types.ObjectId;
    description: string;
    price: number;
    stock: number;
    image?: string;
}
declare const Product: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct> & IProduct & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Product;
