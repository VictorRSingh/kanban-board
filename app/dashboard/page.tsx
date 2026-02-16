"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import ProjectsView from "../components/project/ProjectsView";

export default function DashboardPage() {
  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
       document.title = `Kanban Board - ${user?.user_metadata?.username}`;
    };
    loadUser()
  }, []);

  return <div className="">
    <ProjectsView />
  </div>;
}
