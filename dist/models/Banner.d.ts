interface IBanner {
    title: String;
    subtitle: String;
    link: String;
}
declare const Banner: import("mongoose").Model<IBanner, {}, {}, {}, import("mongoose").Document<unknown, {}, IBanner> & IBanner & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Banner;
