import {Schema, model} from 'mongoose';

interface IBanner {
    title: string,
    subtitle: string,
    link: string
}


const BannerSchema: Schema = new Schema<IBanner>({

    title: {
        type: String,
        required: true,
      },

      subtitle: {
        type: String,
        required: true,
      },
    
      link: {
        type: String,
        required: true,
      },
});

const Banner = model<IBanner>("Banner", BannerSchema);

export default Banner;