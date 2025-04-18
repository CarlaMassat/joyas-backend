export interface IUser {
    email: string;
    password: string;
    name_lastname: string;
    confirmed: boolean;
}
declare const User: import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser> & IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default User;
