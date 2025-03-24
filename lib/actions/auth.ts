// @ts-nocheck
"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const singInWithCredentials = async (params: PickAuthCredentials) => {
  const { email, password } = params;
  try {
    const result = await signIn("credentials", email, password);
    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "singin error");
    return { success: false, error: "singin error" };
  }
};

export const singUp = async (params: AuthCredentials) => {
  const { fullName, password, email, universityCard, universityId } = params;

  const existinguser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existinguser.length > 0) {
    return { success: false, error: "user already exits" };
  }
  const hashesPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityCard,
      universityId,
      password: hashesPassword,
    });
    await singInWithCredentials({ email, password });
    return { success: true };
  } catch (error) {
    console.log(error, "singup error");
    return { success: false, error: "singup error" };
  }
};
