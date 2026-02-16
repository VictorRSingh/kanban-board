"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function ProjectsView() {
  const [projects, setProjects] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*");

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

  if (loading) return <p>Fetching Projects...</p>;

  return (
    <div className="">
      <h1>Projects Overview</h1>

      {projects.length === 0 ? (
        <p>No Projects Available</p>
      ) : (
        projects.map((project) => (
          <div key={project.id}>
            <h2>{project.name}</h2>
          </div>
        ))
      )}
    </div>
  );
}
