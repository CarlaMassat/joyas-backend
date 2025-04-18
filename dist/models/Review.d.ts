interface IReview {
    title: string;
    description: string;
    delay: number;
}
declare const Review: import("mongoose").Model<IReview, {}, {}, {}, import("mongoose").Document<unknown, {}, IReview> & IReview & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Review;
