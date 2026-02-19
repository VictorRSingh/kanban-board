import { Project } from "@/types/Project";
import { useRouter } from "next/navigation";

type ProjectMapperProps = {
  projects: Project[];
};

export default function ProjectMapper({ projects }: ProjectMapperProps) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-3 gap-4">
      {projects.map((project: Project, index: number) => (
        <div
          key={project.id}
          className="border col-span-full lg:col-span-1 rounded-2xl p-3 cursor-pointer hover:border-blue-500 transition"
          onClick={() => router.push(`/dashboard/projects/${project.id!}`)}
        >
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-lg">{project.description}</p>
        </div>
      ))}
    </div>
  );
}
