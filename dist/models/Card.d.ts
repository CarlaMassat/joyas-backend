interface ICard {
    title: string;
    total: number;
}
declare const Card: import("mongoose").Model<ICard, {}, {}, {}, import("mongoose").Document<unknown, {}, ICard> & ICard & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Card;
