import { Schema, model } from "mongoose";


interface ICategory {
    name: string;
   
}

const CategorySchema: Schema = new Schema<ICategory>( {
   
    name: {
        
        type: String,
        required: true,
        unique:true

    },


})
const Category = model<ICategory>('Category', CategorySchema)

export default Category