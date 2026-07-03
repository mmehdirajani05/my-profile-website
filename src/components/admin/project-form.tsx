import type { Project, ProjectCategory } from "@/lib/projects";
import {
  createProjectAction,
  updateProjectAction,
} from "@/app/admin/actions";

type ProjectFormProps = {
  project?: Project;
  categories: ProjectCategory[];
};

export function ProjectForm({ project, categories }: ProjectFormProps) {
  const action = project ? updateProjectAction : createProjectAction;
  const defaultCategoryId = project?.category_id ?? categories[0]?.id;

  return (
    <form action={action} className="grid gap-4">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}
      <label className="grid gap-2">
        <span className="admin-label">Title</span>
        <input
          name="title"
          required
          defaultValue={project?.title}
          className="admin-input"
          placeholder="Project title"
        />
      </label>

      <label className="grid gap-2">
        <span className="admin-label">Category</span>
        <select
          name="category_id"
          required
          defaultValue={defaultCategoryId}
          className="admin-input"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="admin-label">Project URL</span>
        <input
          name="project_url"
          type="url"
          defaultValue={project?.project_url ?? ""}
          className="admin-input"
          placeholder="https://example.com"
        />
      </label>

      <label className="grid gap-2">
        <span className="admin-label">Description</span>
        <textarea
          name="description"
          required
          rows={project ? 4 : 6}
          defaultValue={project?.description}
          className="admin-input resize-y"
          placeholder="What problem did this project solve?"
        />
      </label>

      <label className="grid gap-2">
        <span className="admin-label">Existing media URLs</span>
        <textarea
          name="existing_media_urls"
          rows={project ? 3 : 2}
          defaultValue={project?.media_urls.join("\n") ?? ""}
          className="admin-input resize-y font-mono text-xs"
          placeholder="Optional public media URLs, one per line"
        />
      </label>

      <label className="grid gap-2 rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-5">
        <span className="admin-label">Upload images/videos</span>
        <input
          name="media"
          type="file"
          multiple
          accept="image/*,video/*"
          className="text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-blue-400 file:px-4 file:py-2 file:text-sm file:font-bold file:text-slate-950"
        />
        <span className="text-xs text-slate-500">
          Files are uploaded to Supabase Storage and appended to the project.
        </span>
      </label>

      <button
        type="submit"
        className="rounded-full bg-blue-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-300"
      >
        {project ? "Save changes" : "Create project"}
      </button>
    </form>
  );
}
