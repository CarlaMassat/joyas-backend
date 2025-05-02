interface IAdminCategory {
    name: string;
}
declare const AdminCategory: import("mongoose").Model<IAdminCategory, {}, {}, {}, import("mongoose").Document<unknown, {}, IAdminCategory> & IAdminCategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default AdminCategory;
