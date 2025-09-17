import { connectToDB } from "./db";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";

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