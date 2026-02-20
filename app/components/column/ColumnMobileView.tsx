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
    <>
      <div className="flex flex-col lg:hidden bg-gray-600 flex-1">
        {/* Tabs */}
        <div className="w-full flex max-w-full overflow-x-auto">
          {columns.map((column: Column) => (
            <div
              key={column.id}
              className={`w-full flex items-center justify-center text-center cursor-pointer border ${
                activeColumn === column.id && "bg-blue-600 font-bold"
              }`}
              onClick={() => setActiveColumn(column.id!)}
            >
              <h1>{column.name}</h1>
            </div>
          ))}
        </div>
        {/* Column Data */}
        <div className="w-full flex-1 h-full overflow-auto flex p-4 relative">
          <div className="absolute bottom-0 right-0 p-4">Create Item</div>
        </div>
      </div>
    </>
  );
}
