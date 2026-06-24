"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clearAdminCookie, isAdminAuthenticated, setAdminCookie } from "@/lib/admin-auth";
import {
  PROJECT_MEDIA_BUCKET,
  createSupabaseAdminClient,
} from "@/lib/supabase/admin";
import {
  PROJECT_CATEGORIES,
  isProjectCategory,
  type ProjectInsert,
} from "@/lib/projects";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

function requiredString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${key} is required.`);
  }

  return value.trim();
}

function optionalUrl(formData: FormData) {
  const value = formData.get("project_url");

  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  return value.trim();
}

function categoryFromForm(formData: FormData) {
  const category = requiredString(formData, "category");

  if (!isProjectCategory(category)) {
    throw new Error(`Category must be one of: ${PROJECT_CATEGORIES.join(", ")}.`);
  }

  return category;
}

function existingMediaUrls(formData: FormData) {
  const value = formData.get("existing_media_urls");

  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  return value
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);
}

async function uploadMedia(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const files = formData
    .getAll("media")
    .filter((value): value is File => value instanceof File && value.size > 0);

  const urls: string[] = [];

  for (const file of files) {
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "bin";
    const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${extension}`;

    const { error } = await supabase.storage
      .from(PROJECT_MEDIA_BUCKET)
      .upload(path, file, {
        cacheControl: "31536000",
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload failed for ${file.name}: ${error.message}`);
    }

    const { data } = supabase.storage
      .from(PROJECT_MEDIA_BUCKET)
      .getPublicUrl(path);

    urls.push(data.publicUrl);
  }

  return urls;
}

async function projectPayload(formData: FormData): Promise<ProjectInsert> {
  const uploadedUrls = await uploadMedia(formData);

  return {
    title: requiredString(formData, "title"),
    description: requiredString(formData, "description"),
    category: categoryFromForm(formData),
    project_url: optionalUrl(formData),
    media_urls: [...existingMediaUrls(formData), ...uploadedUrls],
  };
}

export async function loginAction(formData: FormData) {
  const password = requiredString(formData, "password");
  const ok = await setAdminCookie(password);

  if (!ok) {
    redirect("/admin/login?error=1");
  }

  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/admin/login");
}

export async function createProjectAction(formData: FormData) {
  await requireAdmin();

  const supabase = createSupabaseAdminClient();
  const payload = await projectPayload(formData);
  const { error } = await supabase.from("projects").insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProjectAction(formData: FormData) {
  await requireAdmin();

  const id = requiredString(formData, "id");
  const supabase = createSupabaseAdminClient();
  const payload = await projectPayload(formData);
  const { error } = await supabase.from("projects").update(payload).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();

  const id = requiredString(formData, "id");
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin");
  redirect("/admin");
}
