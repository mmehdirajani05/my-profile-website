"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clearAdminCookie, isAdminAuthenticated, setAdminCookie } from "@/lib/admin-auth";
import {
  PROJECT_MEDIA_BUCKET,
  createSupabaseAdminClient,
} from "@/lib/supabase/admin";
import { isVideoUrl, type ProjectInsert, type ProjectMediaInsert } from "@/lib/projects";

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

  const media: Omit<ProjectMediaInsert, "project_id" | "sort_order">[] = [];

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

    media.push({
      media_type: file.type.startsWith("video/") ? "video" : "image",
      path,
      public_url: data.publicUrl,
      alt_text: file.name,
    });
  }

  return media;
}

async function projectPayload(formData: FormData): Promise<ProjectInsert> {
  return {
    title: requiredString(formData, "title"),
    description: requiredString(formData, "description"),
    summary: null,
    category_id: requiredString(formData, "category_id"),
    project_url: optionalUrl(formData),
  };
}

async function mediaPayload(formData: FormData, projectId: string) {
  const uploadedMedia = await uploadMedia(formData);
  const existingMedia = existingMediaUrls(formData).map((url) => ({
    media_type: isVideoUrl(url) ? ("video" as const) : ("image" as const),
    path: url,
    public_url: url,
    alt_text: null,
  }));

  return [...existingMedia, ...uploadedMedia].map((item, index) => ({
    ...item,
    project_id: projectId,
    sort_order: index,
  }));
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
  const { data, error } = await supabase
    .from("portfolio_projects")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const media = await mediaPayload(formData, data.id);

  if (media.length) {
    const { error: mediaError } = await supabase
      .from("portfolio_project_media")
      .insert(media);

    if (mediaError) {
      throw new Error(mediaError.message);
    }
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
  const { error } = await supabase
    .from("portfolio_projects")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  const { error: deleteMediaError } = await supabase
    .from("portfolio_project_media")
    .delete()
    .eq("project_id", id);

  if (deleteMediaError) {
    throw new Error(deleteMediaError.message);
  }

  const media = await mediaPayload(formData, id);

  if (media.length) {
    const { error: mediaError } = await supabase
      .from("portfolio_project_media")
      .insert(media);

    if (mediaError) {
      throw new Error(mediaError.message);
    }
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();

  const id = requiredString(formData, "id");
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("portfolio_projects")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin");
  redirect("/admin");
}
