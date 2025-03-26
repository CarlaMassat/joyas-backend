interface IService {
    title: String;
    description: String;
    delay: number;
}
declare const Service: import("mongoose").Model<IService, {}, {}, {}, import("mongoose").Document<unknown, {}, IService> & IService & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Service;
