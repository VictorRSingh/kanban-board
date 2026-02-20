import { Column } from "@/types/Column";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../ui/Modal";
import TextInput from "../ui/TextInput";
import SubmitButton from "../ui/SubmitButton";
import { Island_Moments } from "next/font/google";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";

type CreateColumnProps = {
  onColumnCreated: (column: Column) => void;
  project_id: string;
};
export default function CreateColumnButton({
  onColumnCreated,
  project_id,
}: CreateColumnProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleCreateColumn = async () => {
    if (!columnName) {
      toast.error("Column must have a name");
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
        .from("columns")
        .insert([
          {
            name: columnName,
            position: 2000,
            project_id: project_id,
          },
        ])
        .select()
        .single();

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Column created!");
      onColumnCreated(data);

      setColumnName("");
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
    <div className="w-full flex justify-end">
      <button
        onClick={() => setIsOpen(true)}
        className="px-2 py-1 bg-green-600 text-white rounded-xl hover:bg-green-700 transition cursor-pointer w-full lg:w-1/2"
      >
        New Column
      </button>

      <Modal title="Create Column" isOpen={isOpen} setIsOpen={setIsOpen}>
        <TextInput
          label="Column name"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
        />

        <SubmitButton
          disabled={isLoading}
          label="Create New Column"
          textColor="text-white"
          onClick={handleCreateColumn}
        />
      </Modal>
    </div>
  );
}
