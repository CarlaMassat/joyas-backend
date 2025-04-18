import { Types } from "mongoose";
interface IUserPayload {
    id: Types.ObjectId;
}
export declare const generateJWT: (payload: IUserPayload) => string;
export {};
