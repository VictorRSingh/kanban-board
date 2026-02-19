import { useState } from "react";
import TextInput from "../ui/TextInput";
import Modal from "../ui/Modal";
import SubmitButton from "../ui/SubmitButton";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Project } from "@/types/Project";

type CreateProjectProps = {
  onProjectCreated: (project: Project) => void;
};

export default function CreateProjectButton({
  onProjectCreated,
}: CreateProjectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleCreateProject = async () => {
    if (!projectName) {
      toast.error("Project must have a name");
      return;
    }

    setIsLoading(true);

    try {
          const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be logged in to perform this action");
      router.push("/");
      return;
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          name: projectName,
          description: projectDescription,
          ownerId: user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Project created!");
    onProjectCreated(data);

    setProjectName("");
    setProjectDescription("");
    setIsOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition cursor-pointer w-full max-w-2xl"
      >
        Create Project
      </button>

      <Modal title="Create Project" isOpen={isOpen} setIsOpen={setIsOpen}>
          <TextInput
            label="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextInput
            label="Project description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />

          <SubmitButton
            disabled={isLoading}
            label="Create New Project"
            textColor="text-white"
            onClick={handleCreateProject}
          />
      </Modal>
    </div>
  );
}
