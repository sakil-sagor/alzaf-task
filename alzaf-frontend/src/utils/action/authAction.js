"use server";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";

export async function loginUser(pre, formData) {
  try {
    const formattedData = JSON.stringify(Object.fromEntries(formData));

    const res = await fetch(
      `https://alzaf-server.vercel.app/api/v1/users/login`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: formattedData,
      }
    );

    const data = await res.json();

    if (data.success) {
      cookies().set("accessToken", data.data);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function logOut() {
  try {
    signOut();
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
  } catch (error) {
    throw error;
  }
}
