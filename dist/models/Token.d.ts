import { Types } from "mongoose";
interface IToken {
    token: string;
    user: Types.ObjectId;
    expiresAt: Date;
}
declare const Token: import("mongoose").Model<IToken, {}, {}, {}, import("mongoose").Document<unknown, {}, IToken> & IToken & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Token;
