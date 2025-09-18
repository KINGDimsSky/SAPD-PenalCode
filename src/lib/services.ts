import { connectToDB } from "./db";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";
import { IUser } from "./types";

export const ValidateUser = async (username: string, password_from_form: string) => {
  try {
    await connectToDB();
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User tidak ditemukan.");
      return null;
    }

    const isPasswordMatch = await bcrypt.compare(
      password_from_form,
      user.password
    );

    if (!isPasswordMatch) {
      console.log("Password salah.");
      return null;
    }
    console.log("Validasi user berhasil.");
    return user;

  } catch (error) {
    console.error("Error saat validasi user:", error);
    return null;
  }
};

export const getAllUsers = async () : Promise<IUser[]> => {
  try {
    await connectToDB();
    const users = await User.find({}).lean<IUser[]>();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users.");
  }
};