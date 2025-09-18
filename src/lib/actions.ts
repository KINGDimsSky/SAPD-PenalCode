'use server';

import { connectToDB } from "./db";
import { User } from "@/lib/models";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export interface RegisterState {
  error?: string;
  success?: boolean;
}
export const registerUser = async (prevState: RegisterState, formData: FormData): Promise<RegisterState> => {
  const { username, password, confirmpword } = Object.fromEntries(formData.entries());

  if (password !== confirmpword) {
    return { error: "Password dan konfirmasi password tidak cocok." };
  }
  
  try {
    await connectToDB();
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { error: "Username sudah digunakan." };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password as string, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User registered successfully");

  } catch (err) {
    console.log(err);
    return { error: "Terjadi kesalahan pada server!" };
  }

  redirect("/");
};

export interface UpdateProfileState {
  error?: string;
  success?: boolean;
}

export const updateUserProfile = async (prevState: UpdateProfileState, formData: FormData): Promise<UpdateProfileState> => {
  const { nickname, faction, rank, badge } = Object.fromEntries(formData.entries());
  
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: "Anda harus login untuk melakukan ini." };
    }
    await connectToDB();
    
    const updateData = {
      Nickname: nickname,
      faction,
      rank,
      badge,
      ifNewAccount: false,
      // Soon ya buat image nya xixi
    };
    
    await User.findByIdAndUpdate(session.user.id, updateData);
    
    revalidatePath("/");
    return { success: true };

  } catch (err) {
    console.error("Error updating profile:", err);
    return { error: "Terjadi kesalahan pada server!" };
  }
};
