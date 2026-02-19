"use client";

import { supabase } from "@/lib/supabaseClient";
import { Project } from "@/types/Project";
import { useEffect, useState } from "react";
import CreateProjectButton from "./CreateProjectButton";
import ProjectMapper from "./ProjectMapper";

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", {ascending: false });

      console.log(data);

      if (error) {
        console.error(error.message);
      } else {
        setProjects(data || []);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleProjectsCreated = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  }

  if (loading) return <p className="flex w-full min-h-screen items-center justify-center">Fetching Projects...</p>;


  return (
    <div className="flex flex-col p-2 w-full space-y-12">
      <h1 className="text-2xl font-semibold w-full">Projects Overview</h1>
      <CreateProjectButton onProjectCreated={handleProjectsCreated}/>
      <ProjectMapper projects={projects} />
    </div>
  );
}
