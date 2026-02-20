"use client";

import { supabase } from "@/lib/supabaseClient";
import { Column } from "@/types/Column";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ColumnDesktopView from "./ColumnDesktopView";
import ColumnMobileView from "./ColumnMobileView";
import CreateColumnButton from "./CreateColumnButton";

type ColumnMapperProps = {
  project_id: string;
};
export default function ColumnMapper({ project_id }: ColumnMapperProps) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchColumns = async (project_id: string) => {
      try {
        const { data, error } = await supabase
          .from("columns")
          .select("*")
          .eq("project_id", project_id);

        if (!error) {
          setColumns(data);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchColumns(project_id);
  }, [project_id]);

  console.log(columns);

  const onColumnCreated = async (newColumn: Column) => {
    setColumns((prev) => [...prev, newColumn]);
  };

  if (isLoading) {
    return <div className="">Fetching Columns</div>;
  }

  return (
    <div className="w-full flex flex-col flex-1 space-y-4">
      <CreateColumnButton
        project_id={project_id}
        onColumnCreated={onColumnCreated}
      />
      <ColumnDesktopView columns={columns} />
      <ColumnMobileView columns={columns} />
    </div>
  );
}
