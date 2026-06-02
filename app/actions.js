"use server";
import { createClient } from "@/app/utils/supabase/server";

export async function submitContactForm(formData) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log("Supabase not configured. Mocking form submission:", formData);
    return { success: true };
  }

  const supabase = await createClient();

  // Data nikalna
  const data = {
    name: formData.name,
    email: formData.email,
    company: formData.company,
    interest: formData.interest,
    message: formData.message,
    submitted_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("contact_messages").insert([data]);

  if (error) {
    console.error("Supabase Error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getContactMessages(page) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log("Supabase not configured. Returning empty messages.");
    return { success: true, data: [] };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("submitted_at", { ascending: false })
    .range((page - 1) * 10, page * 10 - 1);

  if (error) {
    console.error("Supabase Error:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
