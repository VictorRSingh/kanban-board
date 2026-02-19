"use client";

import { supabase } from "@/lib/supabaseClient";
import { Project } from "@/types/Project";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ProjectPageProps = {
  id: string;
};

export default function ProjectPage({ id }: ProjectPageProps) {
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
      {project && (
        <div className="">
          <h1>{project.name}</h1>
        </div>
      )}
    </>
  );
}
