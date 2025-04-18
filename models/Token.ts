import { Schema, model, Types } from "mongoose";

interface IToken {
  token: string;
  user: Types.ObjectId;
  expiresAt: Date;
}

const TokenSchema: Schema = new Schema<IToken>({
  token: {
    type: String,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  expiresAt: {
    type: Date,
    default: Date.now(),
    expires: "10m",
  },
});

const Token = model<IToken>("Token", TokenSchema);

export default Token;