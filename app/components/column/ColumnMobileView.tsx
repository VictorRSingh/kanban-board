import { Column } from "@/types/Column";
import { useState } from "react";

type ColumnMobileViewProps = {
  columns: Column[];
};

export default function ColumnMobileView({ columns }: ColumnMobileViewProps) {
  const [activeColumn, setActiveColumn] = useState<string>(
    columns[0]?.id ?? "",
  );

  return (
    <div className="">
      <div className="flex md:hidden overflow-x-auto border mb-2">
        {columns.map((column: Column) => (
          <button
            key={column.id}
            className={`px-3 py-1 font-medium border ${
              activeColumn === column.id
                ? "border border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveColumn(column.id!)}
          >
            {column.name}
          </button>
        ))}
      </div>
      <div className="md:hidden h-full">
        {columns
          .filter((col) => col.id === activeColumn)
          .map((col) => (
            <div key={col.id} className="bg-gray-600 p-4 rounded">
              <h3 className="font-bold mb-2">{col.name}</h3>
              {/* tasks go here */}
            </div>
          ))}
      </div>
    </div>
  );
}
