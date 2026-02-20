"use client";

import { supabase } from "@/lib/supabaseClient";
import { Project } from "@/types/Project";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ColumnMapper from "../column/ColumnMapper";
import CreateColumnButton from "../column/CreateColumnButton";

type ProjectPageProps = {
  id: string;
};

export default function ProjectView({ id }: ProjectPageProps) {
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProject = async (id: string) => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (!error) {
          setProject(data);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject(id);
  }, [id]);

  return (
    <>
      {project && project.id && (
        <div className="flex flex-col w-full space-y-4 flex-1">
          <div className="flex mt-4 items-center">
            <h1 className="text-2xl font-semibold w-full">{project.name}</h1>
          </div>
          <ColumnMapper project_id={project.id}/>
        </div>
      )}
    </>
  );
}
