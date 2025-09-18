import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  Nickname: string;
  role: string;
  faction: string;
  badge: string;
  rank: string;
  image: string;
  ifNewAccount: boolean;
}