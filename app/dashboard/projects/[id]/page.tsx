import ProjectView from "@/app/components/project/ProjectView";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;


  return (
    <>
        <ProjectView id={id} />
    </>
  )
}
